import React, { Component } from 'react'
import { FlatList } from 'react-native'
import SafeArea from '../components/common/SafeArea'
import FeedPost from '../components/feed/FeedPost'
import FeedOperations from '../operations/FeedOperations'
import { connect } from 'react-redux'
import Loader from '../components/common/Loader'
import { NavigationEvents } from 'react-navigation'

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
  getParentNavigation = () => {
    return this.props.navigation.dangerouslyGetParent()
  }

  onLogoPress = () => {
    this.refs.feedList.scrollToOffset({ offset: 0 })
    this.props.refreshFeed()
  }

  resetOnLogoPress = () => {
    this.getParentNavigation().setParams({ 
      onLogoPress: null
    })
  }

  setOnLogoPress = () => {
    this.getParentNavigation().setParams({ 
      onLogoPress: this.onLogoPress
    })
  }

  addToFeed = () => {
    const { page, feedLoading }  = this.props.feed
    nextPage = page + 1
    if (!feedLoading) {
      this.props.getFeed(nextPage)
    } 
  }

  componentDidMount() {
    this.props.getFeed()
  }

  render() {
    const { navigation, refreshFeed, feed: { feedData, feedLoading } } = this.props

    return (
      <SafeArea>
        <NavigationEvents
          onDidFocus={this.setOnLogoPress}
          onDidBlur={this.resetOnLogoPress}
        />
        {feedLoading && !feedData.length ?
          <Loader />
          :
          <FlatList
            ref='feedList'
            data={feedData}
            keyExtractor={item => item.id + ''}
            renderItem={({ item }) => (
              <FeedPost  
                item={item} 
                navigation={navigation} />)} 
            onEndReached={this.addToFeed} 
            onEndReachedThreshold={1}
            onRefresh={refreshFeed}
            refreshing={feedLoading}
            ListFooterComponent={feedLoading && <Loader />} />
        }
      </SafeArea>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedScreen)
