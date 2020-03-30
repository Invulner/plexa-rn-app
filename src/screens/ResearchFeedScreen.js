import React, { Component } from 'react'
import SafeArea from '../components/common/SafeArea'
import { FlatList } from 'react-native'
import { connect } from 'react-redux'
import ResearchFeedOperations from '../operations/ResearchFeedOperations'
import Loader from '../components/common/Loader'
import Featured from '../components/researchFeed/Featured'
import { NavigationEvents } from 'react-navigation'

const mapStateToProps = (state) => {
  const { researchFeed, network: { isConnected } } = state

  return { 
    researchFeed,
    isConnected
  }
}

const mapDispatchToProps = (dispatch) => {
  const getResearchFeed = (page) => dispatch(ResearchFeedOperations.getResearchFeed(page))
  const refreshResearchFeed = () => dispatch(ResearchFeedOperations.refreshResearchFeed())

  return { 
    getResearchFeed,
    refreshResearchFeed
  }
}

class ResearchFeedScreen extends Component {
  addToFeed = () => {
    const { isConnected, getResearchFeed, researchFeed: { page, loading } } = this.props
    
    isConnected && !loading && getResearchFeed(page + 1)
  }

  refreshFeed = () => {
    const { isConnected, refreshResearchFeed } = this.props

    isConnected && refreshResearchFeed()
  }

  getParentNavigation = () => {
    return this.props.navigation.dangerouslyGetParent()
  }

  setScreenParams = () => {
    this.getParentNavigation().setParams({
      isResearchFeedScreen: true
    })
  }

  resetScreenParams = () => {
    this.getParentNavigation().setParams({
      isResearchFeedScreen: false
    })
  }

  render() {
    const { researchFeed: { loading, feedData }, navigation } = this.props
    const feedRefreshing = false

    return (
      <SafeArea>
        <NavigationEvents
          onDidFocus={this.setScreenParams}
          onDidBlur={this.resetScreenParams} />
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
            refreshing={feedRefreshing}
            ListFooterComponent={loading && <Loader />}
            onEndReached={this.addToFeed}
            onEndReachedThreshold={0.5}
            onRefresh={this.refreshFeed} />
        }
      </SafeArea>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResearchFeedScreen)
