import React, { Component } from 'react'
import { View, FlatList } from 'react-native'
import { connect } from 'react-redux'
import SafeArea from '../components/common/SafeArea'
import FeedPost from '../components/feed/FeedPost'
import Featured from '../components/researchFeed/Featured'
import FeedOperations from '../operations/FeedOperations'
import ResearchFeedOperations from '../operations/ResearchFeedOperations'
import Loader from '../components/common/Loader'

const mapStateToProps = (state) => {
  const { feed, researchFeed } = state
  const { feedData: researchData } = researchFeed
  const { feedData: mainData } = feed

  const getMixedFeed = () => {
    let counter = 0
    let mixed = []
    let newArr = []

    if (mainData.length && researchData.length) {
      mainData.map((item, index) => {
        if (index % 5 === 0) {
          newArr = mainData.slice(index, index + 5).concat(researchData[counter])
          mixed.length ? mixed = mixed.concat(newArr) : mixed = newArr
          counter++    
        }
      })
    }
    return mixed
  }

  return { 
    getMixedFeed,
    feed,
    researchFeed
  }
}

const mapDispatchToProps = (dispatch) => {
  const getMainFeed = (page) => dispatch(FeedOperations.getFeed(page))
  const getResearchFeed = (page) => dispatch(ResearchFeedOperations.getResearchFeed(page))

  return { 
    getMainFeed,
    getResearchFeed
  }
}

class MixedFeedScreen extends Component {
  addToFeed = (page, loading, getFeed) => {
    !loading && getFeed(page + 1)
  }

  addToFeeds = () => {
    const { getMainFeed, getResearchFeed, feed, researchFeed }  = this.props
    const { page: feedPage, feedLoading } = feed
    const { page: researchPage, loading: researchLoading } = researchFeed
    this.addToFeed(feedPage, feedLoading, getMainFeed)
    this.addToFeed(researchPage, researchLoading, getResearchFeed)
  } 

  render() {
    const mixedFeed = this.props.getMixedFeed()
    console.log(mixedFeed)
    const { navigation, feed: { feedLoading }, researchFeed: { loading } } = this.props

    return (
      <SafeArea>
        <View>
          {!!mixedFeed.length &&
            <FlatList 
              data={mixedFeed}
              keyExtractor={item => item.id + ''}
              renderItem={({ item, index }) => (
                (index + 1) % 6 === 0 ? <Featured item={item} /> : <FeedPost item={item} navigation={navigation} />
              )}
              onEndReached={this.addToFeeds}
              onEndReachedThreshold={1} 
              ListFooterComponent={(feedLoading || loading) && <Loader />}
            />}
        </View>
      </SafeArea>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MixedFeedScreen)
