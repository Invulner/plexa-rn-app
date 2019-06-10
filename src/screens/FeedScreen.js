import React, { Component } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import SafeArea from '../components/common/SafeArea'
import FeedPost from '../components/feed/FeedPost'
import FeedOperations from '../operations/FeedOperations'
import AppOperations from '../operations/AppOperations'
import { connect } from 'react-redux'
import Loader from '../components/common/Loader'
import { NavigationEvents } from 'react-navigation'
import PostPlaceholder from '../components/feed/PostPlaceholder'
import FeedFilter from '../components/feed/FeedFilter'
import { POSTS_IN_PAGE } from '../constants'
import { RegularText } from '../components/common/fonts'
import FeedActions from '../actions/FeedActions'

const mapDispatchToProps = (dispatch) => {
  const getFeed = (page, filter) => dispatch(FeedOperations.getFeed(page, filter))
  const refreshFeed = (filter) => dispatch(FeedOperations.refreshFeed(filter))
  const connectToWs = () => dispatch(FeedOperations.connectToWs())
  const toggleFeedFilter = () => dispatch(FeedActions.toggleFilter())

  return {
    connectToWs,
    getFeed,
    refreshFeed,
    toggleFeedFilter
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
  state = {
    listEmpty: false
  }

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

  resetScreenParams = () => {
    this.getParentNavigation().setParams({
      isFeedScreen: false
    })
  }

  setScreenParams = () => {
    this.getParentNavigation().setParams({ 
      isFeedScreen: true
    })
  }

  refreshFeed = () => {
    const { isConnected, refreshFeed, feed: { filter } } = this.props

    isConnected && refreshFeed(filter)
  }

  shouldAddToFeed = () => {
    const { page, feedData } = this.props.feed

    return page * POSTS_IN_PAGE === feedData.length
  }

  onEndReached = () => {
    const { feed: { page, feedLoading, filter }, getFeed, isConnected }  = this.props
    const nextPage = page + 1
    
    isConnected && this.shouldAddToFeed() && !feedLoading && getFeed(nextPage, filter)
  }

  renderListEmptyComponent = () => {
    return (
      <View style={styles.listEmpty}>
        <RegularText style={styles.text}>
          There are no posts for your search
        </RegularText>
        <RegularText style={styles.text}>
          Change your <RegularText 
                        onPress={() => this.props.toggleFeedFilter()} 
                        style={{textDecorationLine: 'underline'}}>
                          filters
                      </RegularText>
        </RegularText>
      </View>
    )
  }

  componentDidUpdate(prevProps) {
    const { isConnected, connectToWs, isCableConnected, feed: { feedData, feedLoading } } = this.props
    //Works when connection is restored and after app reboot with state rehydration
    if (prevProps.isCableConnected !== isCableConnected && isCableConnected) {
      connectToWs()
    //Need to add check for change from initial state to false
    } else if (prevProps.isConnected !== null && !isConnected) {
      AppOperations.disconnectFromWs()
    }

    if (prevProps.feed.feedLoading && !feedLoading && !feedData.length) {
      this.setState({ listEmpty: true })
    } else if (!prevProps.feed.feedLoading && feedLoading) {
      this.setState({ listEmpty: false })
    }
  }

  componentDidMount() {
    //Works after login
    const { isConnected, connectToWs } = this.props

    isConnected && connectToWs()
  }

  componentWillUnmount() {
    //Check if there was connection before component unmounting
    this.props.isConnected && AppOperations.disconnectFromWs()
  }

  render() {
    const { feed: { feedData, feedLoading } } = this.props

    return (
      <SafeArea>
        <NavigationEvents
          onDidFocus={this.setScreenParams}
          onDidBlur={this.resetScreenParams} />

        <FeedFilter />
        {this.state.listEmpty &&
          this.renderListEmptyComponent() 
        }
        {feedLoading && !feedData.length ?
          <Loader />
          :
          <FlatList
            style={!feedData.length && {display: 'none'}}
            ref='feedList'
            data={feedData}
            keyExtractor={item => item.id + ''}
            renderItem={this.renderItem} 
            onEndReached={this.onEndReached} 
            onEndReachedThreshold={1}
            onRefresh={this.refreshFeed}
            refreshing={feedLoading}
            ListFooterComponent={feedLoading && <Loader style={{marginTop: 15}} />} />
        }
      </SafeArea>
    )
  }
}

const styles = StyleSheet.create({
  listEmpty: {
    flex: 1,  
    justifyContent: 'center', 
    alignItems: 'center'
  },

  text: {
    fontSize: 20
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(FeedScreen)
