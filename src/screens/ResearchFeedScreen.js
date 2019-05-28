import React, { Component } from 'react'
import SafeArea from '../components/common/SafeArea'
import { FlatList } from 'react-native'
import { connect } from 'react-redux'
import ResearchFeedOperations from '../operations/ResearchFeedOperations'
import Loader from '../components/common/Loader'
import Featured from '../components/researchFeed/Featured'

const mapDispatchToProps = (dispatch) => {
  const getResearchFeed = (page) => dispatch(ResearchFeedOperations.getResearchFeed(page))
  const refreshResearchFeed = () => dispatch(ResearchFeedOperations.refreshResearchFeed())

  return { 
    getResearchFeed,
    refreshResearchFeed
  }
}

const mapStateToProps = (state) => {
  const { researchFeed } = state

  return { researchFeed }
}

class ResearchFeedScreen extends Component {
  addToFeed = () => {
    const { getResearchFeed, researchFeed: { page, loading } } = this.props
    !loading && getResearchFeed(page + 1)
  }

  componentDidMount() {
    // this.props.getResearchFeed()
  }

  render() {
    const { refreshResearchFeed, researchFeed: { loading, feedData }, navigation } = this.props

    return (
      <SafeArea>
        {loading && !feedData.length ?
          <Loader />
          :
          <FlatList 
            data={feedData}
            keyExtractor={item => item.id + ''}
            renderItem={({ item }) => (
              <Featured 
                item={item} 
                navigation={navigation} />)}
            refreshing={loading}
            ListFooterComponent={loading && <Loader />}
            onEndReached={this.addToFeed}
            onEndReachedThreshold={0.5}
            onRefresh={refreshResearchFeed} />
        }
      </SafeArea>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResearchFeedScreen)
