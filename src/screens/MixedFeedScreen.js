import React, { Component } from 'react'
import { View, FlatList } from 'react-native'
import { connect } from 'react-redux'
import SafeArea from '../components/common/SafeArea'
import FeedPost from '../components/feed/FeedPost'
import Featured from '../components/researchFeed/Featured'

const mapStateToProps = (state) => {
  const { feedData: featured } = state.researchFeed
  const { feedData } = state.feed

  return { 
    featured,
    feedData
  }
}

class MixedFeedScreen extends Component {
 getMixedFeed = () => {
    const { feedData, featured } = this.props
    let counter = 0
    let mixed = []
    let newArr = []

    if (feedData.length && featured.length) {
      feedData.map((item, index) => {
        if (index % 5 === 0) {
          console.log(index)
          newArr = feedData.slice(index, index+5).concat(featured[counter])
          mixed.length ? mixed = mixed.concat(newArr) : mixed = newArr
          console.log(mixed)
          counter++    
        }
      })
    }
    return mixed
  }

  render() {
    const mixedFeed = this.getMixedFeed()
    const { navigation } = this.props

    return (
      <SafeArea>
        <View>
          {!!mixedFeed.length &&
            <FlatList 
              data={mixedFeed}
              keyExtractor={item => item.id + ''}
              renderItem={({ item, index }) => (
                (index + 1) % 6 === 0 ? <Featured item={item} /> : <FeedPost item={item} navigation={navigation} />
              )} />}
        </View>
      </SafeArea>
      )
  }
}

export default connect(mapStateToProps, null)(MixedFeedScreen)
