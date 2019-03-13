import React, { Component } from 'react'
import { FlatList } from 'react-native'
import SafeArea from '../components/common/SafeArea'
import FeedPost from '../components/feed/FeedPost'
import FeedOperations from '../operations/FeedOperations'
import { connect } from 'react-redux'
import Loader from '../components/common/Loader'
import { getSortedPosts } from '../selectors/Feed'

const mapDispatchToProps = (dispatch) => {
  const getFeed = (page) => dispatch(FeedOperations.getFeed(page))
  const refreshFeed = () => dispatch(FeedOperations.refreshFeed())

  return { 
    getFeed,
    refreshFeed
  }
}

const mapStateToProps = (state) => {
  const { page, feedLoading } = state.feed

  return { 
    feedData: getSortedPosts(state),
    page,
    feedLoading
  }
}

class FeedScreen extends Component {
  componentDidMount() {
    this.props.getFeed()
  }

  addToFeed = () => {
    const { page, feedLoading }  = this.props
    nextPage = page + 1
    if (!feedLoading) {
      this.props.getFeed(nextPage)
    } 
  }

  render() {
    const { navigation, refreshFeed, feedData, feedLoading } = this.props

    return (
      <SafeArea>
        {feedLoading && !feedData.length ?
          <Loader />
          :
          <FlatList 
            data={feedData}
            keyExtractor={item => item.id + ''}
            renderItem={({ item }) => (
              <FeedPost  
                item={item} 
                navigation={navigation} />)} 
            onEndReached={() => this.addToFeed()} 
            onEndReachedThreshold={1}
            onRefresh={() => refreshFeed()}
            refreshing={feedLoading}
            ListFooterComponent={feedLoading && <Loader />} />
        }
      </SafeArea>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedScreen)
