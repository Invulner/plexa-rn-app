import React, { Component } from 'react'
import { FlatList } from 'react-native'
import SafeArea from '../components/common/SafeArea'
import FeedPost from '../components/feed/FeedPost'
import FeedOperations from '../operations/FeedOperations'
import { connect } from 'react-redux'
import Loader from '../components/common/Loader'
import { NavigationEvents } from 'react-navigation'
import registerForPushNotificationsAsync from '../config/registerForPushNotificationsAsync'
import { Notifications } from 'expo'
import PostPlaceholder from '../components/feed/PostPlaceholder'

const mapDispatchToProps = (dispatch) => {
  const getFeed = (page) => dispatch(FeedOperations.getFeed(page))
  const refreshFeed = () => dispatch(FeedOperations.refreshFeed())
  const connectToWs = () => dispatch(FeedOperations.connectToWs())

  return {
    connectToWs,
    getFeed,
    refreshFeed
  }
}

const mapStateToProps = (state) => {
  const { feed, network: { isConnected } } = state

  return { 
    feed,
    isConnected
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
    const { isConnected, connectToWs } = this.props
    //Works when connection is restored and after app reboot with state rehydration
    if (prevProps.isConnected !== isConnected && isConnected) {
      connectToWs()
    //Need to add check for change from initial state to false
    } else if (prevProps.isConnected !== null && !isConnected) {
      FeedOperations.disconnectFromWs()
    }
  }

  async componentDidMount() {
    //Works after login
    const { isConnected, connectToWs } = this.props

    isConnected && connectToWs()
    await registerForPushNotificationsAsync()
    this._notificationSubscription = Notifications.addListener(this._handleNotification)
  }

  componentWillUnmount() {
    //Check if there was connection before component unmounting
    this.props.isConnected && FeedOperations.disconnectFromWs()
  }

  _handleNotification = (notification) => {
    console.log(notification)
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
      </SafeArea>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedScreen)
