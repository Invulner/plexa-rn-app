import React, { Component } from 'react'
import { FlatList } from 'react-native'
import SafeArea from '../components/common/SafeArea'
import FeedPost from '../components/feed/FeedPost'
import FeedOperations from '../operations/FeedOperations'
import { connect } from 'react-redux'
import Loader from '../components/common/Loader'
import { NavigationEvents } from 'react-navigation'
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
    console.log('resetScreenParams')
    this.getParentNavigation().setParams({ 
      onLogoPress: null,
      isFeedScreen: false
    })
  }

  setScreenParams = () => {
    console.log('setScreenParams')
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
    //Works when connection is restored and afted app reboot with state rehydration
    if (prevProps.isConnected !== isConnected && isConnected) {
      console.log('connectToWS from componentDidUpdate')
      connectToWs()
      //Need to add check for hange from initial state to false
    } else if (prevProps.isConnected !== null && !isConnected) {
      FeedOperations.disconnectFromWs()
    }
  }

  componentDidMount() {
    const { isConnected, connectToWs } = this.props
    //Condition works, but connectToWs() doesn't
    isConnected && console.log('connectToWS from componentDidMount') && connectToWs() 
  }

  componentWillUnmount() {
    //Need to check because we can't disconnect if we weren't connected
    this.props.isConnected && FeedOperations.disconnectFromWs()
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
