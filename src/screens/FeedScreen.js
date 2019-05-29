import React, { Component } from 'react'
import { FlatList, Vibration } from 'react-native'
import SafeArea from '../components/common/SafeArea'
import FeedPost from '../components/feed/FeedPost'
import FeedOperations from '../operations/FeedOperations'
import AppOperations from '../operations/AppOperations'
import { connect } from 'react-redux'
import Loader from '../components/common/Loader'
import { NavigationEvents } from 'react-navigation'
import registerForPushNotificationsAsync from '../config/registerForPushNotificationsAsync'
import { Notifications } from 'expo'
import PostPlaceholder from '../components/feed/PostPlaceholder'
import DropdownAlert from 'react-native-dropdownalert'

const mapDispatchToProps = (dispatch) => {
  const getFeed = (page) => dispatch(FeedOperations.getFeed(page))
  const refreshFeed = () => dispatch(FeedOperations.refreshFeed())
  const connectToWs = () => dispatch(FeedOperations.connectToWs())
  const connectToCable = () => dispatch(AppOperations.connectToWs())

  return {
    connectToWs,
    connectToCable,
    getFeed,
    refreshFeed
  }
}

const mapStateToProps = (state) => {
  const { feed, network: { isConnected, isCableConnected }, user: { loading }} = state

  return { 
    feed,
    isConnected,
    isCableConnected,
    loading
  }
}

class FeedScreen extends Component {
  renderItem = ({ item }) => {
    const { navigation } = this.props

    if (item.hidden) 
      return <PostPlaceholder option={'hidden'} />
    else if (item.reported)
      return <PostPlaceholder option={'reported'} />
    else if (item.deleted)
      return <PostPlaceholder option={'deleted'} />
    else if (item.blocked)
      return null
    else
      return (
        <FeedPost  
          item={item} 
          navigation={navigation} />
      )
  }

  getParentNavigation = () => {
    return this.props.navigation.dangerouslyGetParent()
  }

  onLogoPress = () => {
    this.refs.feedList.scrollToOffset({ offset: 0 })
    this.props.refreshFeed()
  }

  resetScreenParams = () => {
    this.getParentNavigation().setParams({ 
      onLogoPress: null,
      isFeedScreen: false
    })
  }

  setScreenParams = () => {
    this.getParentNavigation().setParams({ 
      onLogoPress: this.onLogoPress,
      isFeedScreen: true
    })
  }

  refreshFeed = () => {
    const { isConnected, refreshFeed } = this.props

    isConnected && refreshFeed()
  }   

  onEndReached = () => {
    const { feed: { page, feedLoading }, getFeed, isConnected }  = this.props
    const nextPage = page + 1

    isConnected && !feedLoading && getFeed(nextPage)
  }

  componentDidUpdate(prevProps) {
    const { isConnected, connectToWs, connectToCable, isCableConnected, loading } = this.props
    //Works when connection is restored and after app reboot with state rehydration
    if (prevProps.isCableConnected !== isCableConnected && isCableConnected) {
      connectToWs()
    //Need to add check for change from initial state to false
    } else if (prevProps.isConnected !== null && !isConnected) {
      FeedOperations.disconnectFromWs()
    }

    // After login, when cable was not connected in AppLoading Screen
    if (prevProps.loading !== loading && !loading) {
      connectToCable()
    }
  }

  componentDidMount() {
    //Works after login
    const { isConnected, connectToWs } = this.props

    isConnected && connectToWs()
    registerForPushNotificationsAsync()
    this._notificationSubscription = Notifications.addListener(this._handleNotification)
  }

  componentWillUnmount() {
    //Check if there was connection before component unmounting
    this.props.isConnected && FeedOperations.disconnectFromWs()
  }

  _handleNotification = (notification) => {
    Vibration.vibrate(1000)

    if (notification.origin === 'selected') {
      this._navigateToPage(notification.data)
    } else {
      this.dropdown.alertWithType('info', notification.data.title, notification.data.body)
      this.notificationData = notification.data
    }
  }

  _navigateToPage = (data) => {
    const { navigation } = this.props
    if (data.type === 'answer') {
      navigation.navigate('Post', { postId: data.story_id })
    } else if (data.type === 'message') {
      navigation.navigate('Chat', { chatId: data.room_id })
    }
  }

  render() {
    const { feed: { feedData, feedLoading } } = this.props

    return (
      <SafeArea>
        <NavigationEvents
          onDidFocus={this.setScreenParams}
          onDidBlur={this.resetScreenParams} />
        {feedLoading && !feedData.length ?
          <Loader />
          :
          <FlatList
            ref='feedList'
            data={feedData}
            keyExtractor={item => item.id + ''}
            renderItem={this.renderItem} 
            onEndReached={this.onEndReached} 
            onEndReachedThreshold={1}
            onRefresh={this.refreshFeed}
            refreshing={feedLoading}
            ListFooterComponent={feedLoading && <Loader />} />
        }
        <DropdownAlert ref={ref => this.dropdown = ref}
          onClose={({ type, title, message, action }) => (action === 'tap') && this._navigateToPage(this.notificationData)}
          infoColor='#7e7763'
        />
      </SafeArea>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedScreen)
