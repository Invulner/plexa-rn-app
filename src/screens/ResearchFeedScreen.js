import React, { Component } from 'react'
import SafeArea from '../components/common/SafeArea'
import { View, FlatList } from 'react-native'
import { RegularText } from '../components/common/fonts'
import { connect } from 'react-redux'
import ResearchFeedOperations from '../operations/ResearchFeedOperations'
import Loader from '../components/common/Loader'
import Featured from '../components/researchFeed/Featured'
import { FEATURED } from '../assets/styles/colors'

const mapDispatchToProps = (dispatch) => {
  const fetchResearchFeed = (page) => dispatch(ResearchFeedOperations.fetchResearchFeed(page))

  return { fetchResearchFeed }
}

const mapStateToProps = (state) => {
  const { researchFeed } = state

  return { researchFeed }
}

class ResearchFeedScreen extends Component {
  componentDidMount() {
    this.props.fetchResearchFeed()
  }

  addToFeed = () => {
    const { fetchResearchFeed, researchFeed: { page, loading } } = this.props

    !loading && fetchResearchFeed(page+1)
  }

  render() {
    const { loading, feedData } = this.props.researchFeed

    return (
      <SafeArea>
        {loading && !feedData.length ?
          <Loader />
          :
          <FlatList 
            data={feedData}
            keyExtractor={item => item.id + ''}
            renderItem={({item}) => <Featured item={item} />}
            refreshing={loading}
            ListFooterComponent={loading && <Loader />}
            onEndReached={this.addToFeed}
            onEndReachedThreshold={0.5} />
        }
      </SafeArea>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResearchFeedScreen)
