import React, { Component } from 'react'
import SafeArea from '../components/common/SafeArea'
import { View } from 'react-native'
import { RegularText } from '../components/common/fonts'
import { connect } from 'react-redux'
import ResearchFeedOperations from '../operations/ResearchFeedOperations'

const mapDispatchToProps = (dispatch) => {
  const getResearchFeed = () => dispatch(ResearchFeedOperations.getResearchFeed())

  return { getResearchFeed }
}

class ResearchFeedScreen extends Component {
  componentDidMount() {
    this.props.getResearchFeed()
  }

  render() {
    return (
      <SafeArea>
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <RegularText style={{fontSize: 22}}>Research Feed</RegularText>
        </View>
      </SafeArea>
    )
  }
}

export default connect(null, mapDispatchToProps)(ResearchFeedScreen)
