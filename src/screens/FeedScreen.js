import React, { Component } from 'react'
import { FlatList, NetInfo } from 'react-native'
import SafeArea from '../components/common/SafeArea'
import FeedPost from '../components/feed/FeedPost'
import FeedOperations from '../operations/FeedOperations'
import { connect } from 'react-redux'
import Loader from '../components/common/Loader'
import { NavigationEvents } from 'react-navigation'
import PostPlaceholder from '../components/feed/PostPlaceholder'
import utils from '../utils'

const mapDispatchToProps = (dispatch) => {
  const getFeed = (page) => dispatch(FeedOperations.getFeed(page))
  const refreshFeed = () => dispatch(FeedOperations.refreshFeed())

  return { 
    getFeed,
    refreshFeed
  }
}

const mapStateToProps = (state) => {
  const { feed } = state

  return { feed }
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
    NetInfo.isConnected.fetch().then(isConnected => {
      if (isConnected) {
        this.refs.feedList.scrollToOffset({ offset: 0 })
        this.props.refreshFeed()
      } else {
        utils.showConnectivityError()
      }
    })
  }

  resetScreenParams = () => {
    this.getParentNavigation().setParams({ 
      onLogoPress: null,
      isFeedScreen: false
    })
    NetInfo.removeEventListener('connectionChange', this.onConnectionChange)
  }

  setNavParams = () => {
    this.getParentNavigation().setParams({ 
      onLogoPress: this.onLogoPress,
      isFeedScreen: true
    })
  }

  refreshFeed = () => {
    console.log('refreshFeed')
    NetInfo.isConnected.fetch().then(isConnected => {
      console.log('isConnected :', isConnected)

      if (isConnected)
        this.props.refreshFeed()
      else
        utils.showConnectivityError()
    })
  }

  onConnectionChange = ({ type }) => {
    console.log('onConnectionChange')
    console.log('connection type: ', type)
    const { feed: { page }, getFeed } = this.props

    type !== 'none' && type !== 'unknown' && getFeed(page + 1)
  }

  onEndReached = () => {
    console.log('onEndReached')
    const { feed: { page, feedLoading }, getFeed }  = this.props
    nextPage = page + 1

    NetInfo.isConnected.fetch().then(isConnected => {
      if (isConnected && !feedLoading) 
        getFeed(nextPage)
      
      else if (!isConnected) {
        utils.showConnectivityError()
        NetInfo.addEventListener('connectionChange', this.onConnectionChange)
      }
    }) 
  }

  componentDidMount() {
    const { feed: { feedData }, refreshFeed } = this.props

    NetInfo.isConnected.fetch().then(isConnected => {
      if (!isConnected && !feedData.length)
        utils.showConnectivityError()
      else if (isConnected)
        refreshFeed()
    })  
  }

  render() {
    const { feed: { feedData, feedLoading } } = this.props

    return (
      <SafeArea>
        <NavigationEvents
          onDidFocus={this.setNavParams}
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
