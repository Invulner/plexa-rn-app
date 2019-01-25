import React, { Component } from 'react'
import { FlatList, ActivityIndicator, View, StyleSheet } from 'react-native'
import SafeArea from '../components/common/SafeArea'
import FeedPost from '../components/feed/FeedPost'
import FeedOperations from '../operations/FeedOperations'
import { connect } from 'react-redux'

const mapDispatchToProps = (dispatch) => {
  const getFeed = (saveOption, page) => dispatch(FeedOperations.getFeed(saveOption, page))

  return { 
    getFeed
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
    this.props.getFeed('add')
  }

  getFeed = () => {
    const { page, feedLoading }  = this.props.feed
    nextPage = page + 1
    if (!feedLoading) {
      this.props.getFeed('add', nextPage)
    } 
  }

  render() {
    const { getFeed, feed: { feedData, feedLoading } } = this.props

    return (
      <SafeArea>
        {feedLoading && !feedData.length ?
          <View style={styles.indicatorContainer}>
            <ActivityIndicator size='large' />
          </View>
          :
          <FlatList 
            data={feedData}
            keyExtractor={item => item.id + ''}
            renderItem={({ item }) => <FeedPost item={item} />} 
            onEndReached={() => this.getFeed()} 
            onEndReachedThreshold={1}
            onRefresh={() => getFeed('refresh')}
            refreshing={feedLoading}
            ListFooterComponent={feedLoading && <ActivityIndicator size='large' />} />
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
