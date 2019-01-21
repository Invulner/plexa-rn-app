import React, { Component } from 'react'
import { FlatList, ActivityIndicator, View, StyleSheet } from 'react-native'
import SafeArea from '../components/common/SafeArea'
import FeedPost from '../components/feed/FeedPost'
import FeedOperations from '../operations/FeedOperations'
import { connect } from 'react-redux'

const mapDispatchToProps = (dispatch) => {
  const getFeed = () => dispatch(FeedOperations.getFeed())

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

  render() {
    const { feedData, feedLoading } = this.props.feed

    return (
      <SafeArea>
        {feedLoading ?
          <View style={styles.indicatorContainer}>
            <ActivityIndicator />
          </View>
          :
          <FlatList 
            data={feedData}
            keyExtractor={item => item.id + ''}
            renderItem={({ item }) => (
              <FeedPost item={item} />
            )} />
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
