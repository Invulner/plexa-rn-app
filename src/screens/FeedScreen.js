import React, { Component } from 'react'
import { FlatList, ActivityIndicator, View, StyleSheet } from 'react-native'
import SafeArea from '../components/common/SafeArea'
import FeedPost from '../components/feed/FeedPost'
import FeedOperations from '../operations/FeedOperations'
import { connect } from 'react-redux'

const mapDispatchToProps = (dispatch) => {
  const getFeed = () => dispatch(FeedOperations.getFeed())
  const loadMoreFeed = (page) => dispatch(FeedOperations.loadMoreFeed(page))

  return { 
    getFeed,
    loadMoreFeed
  }
}

const mapStateToProps = (state) => {
  const { feed } = state

  return { 
    feed 
  }
}

class FeedScreen extends Component {
  componentDidMount() {
    this.props.getFeed()
  }

  loadMoreFeed = () => {
    const { page, nextPageLoading }  = this.props.feed
    if (!nextPageLoading) {
      this.props.loadMoreFeed(page)
      console.log('load more feed fired')
    } else {
      return
    }
  }

  render() {
    const { feedData, feedLoading, nextPageLoading } = this.props.feed

    return (
      <SafeArea>
        {feedLoading ?
          <View style={styles.indicatorContainer}>
            <ActivityIndicator />
          </View>
          :
          <FlatList 
            data={feedData}
            keyExtractor={item => item.created_at}
            renderItem={({ item }) => (<FeedPost item={item} />)} 
            onEndReached={this.loadMoreFeed} 
            onEndReachedThreshold={1}
            ListFooterComponent={nextPageLoading && <ActivityIndicator />} />
        }
      </SafeArea>
    )
  }
}

const styles = StyleSheet.create({
  indicatorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(FeedScreen)
