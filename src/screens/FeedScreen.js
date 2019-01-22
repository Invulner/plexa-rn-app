import React, { Component } from 'react'
import { FlatList, ActivityIndicator, View, StyleSheet } from 'react-native'
import SafeArea from '../components/common/SafeArea'
import FeedPost from '../components/feed/FeedPost'
import FeedOperations from '../operations/FeedOperations'
import { connect } from 'react-redux'

const mapDispatchToProps = (dispatch) => {
  const getFeed = (page) => dispatch(FeedOperations.getFeed(page))

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
    this.props.getFeed()
  }

  getFeed = () => {
    const { page, feedLoading }  = this.props.feed
    if (!feedLoading) {
      this.props.getFeed(page)
    } 
  }

  render() {
    const { feedData, feedLoading, page } = this.props.feed

    return (
      <SafeArea>
        {feedLoading && feedData.length === 0 ?
          <View style={styles.indicatorContainer}>
            <ActivityIndicator />
          </View>
          :
          <FlatList 
            data={feedData}
            keyExtractor={item => item.id + ''}
            renderItem={({ item }) => <FeedPost item={item} />} 
            onEndReached={() => this.getFeed(page)} 
            onEndReachedThreshold={1}
            ListFooterComponent={feedLoading && <ActivityIndicator />} />
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
