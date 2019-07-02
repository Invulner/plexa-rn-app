import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { composeButton } from '../../../constants'
import DynamicIcon from '../DynamicIcon'

const mapStateToProps = (state) => {
  const { isConnected } = state.network

  return { isConnected }
}

class ComposeBtn extends Component {
  state = {
    path: null
  }

  static getDerivedStateFromProps({ navigation }) {
    const isChatsScreen = navigation.getParam('isChatsScreen')
    const isFeedScreen = navigation.getParam('isFeedScreen')
    const isResearchFeedScreen = navigation.getParam('isResearchFeedScreen')
    const isPropfileScreen = navigation.getParam('isProfileScreen')

    if (isFeedScreen) {
      return {
        path: 'feed'
      }
    } else if (isChatsScreen || isResearchFeedScreen || isPropfileScreen) {
      return {
        path: null
      }
    } else return null
  }

  getIcon = () => {
    return this.props.isConnected ? 'active' : 'inactive'
  }

  render() {
    const { navigation, isConnected } = this.props

    return (
      <React.Fragment>
        {this.state.path === 'feed' &&
          <TouchableOpacity
            disabled={!isConnected} 
            style={styles.addPostButton} 
            onPress={() => navigation.navigate('Compose')}>
            <DynamicIcon 
              style={styles.addPostIcon}
              src={composeButton} />
          </TouchableOpacity>
        }
       </React.Fragment>
    )
  }
}

const styles = StyleSheet.create({
  addPostIcon: {
    marginTop: 6,
    width: 27,
    height: 27
  },
  
  addPostButton: {
    paddingLeft: 10
  }
})

export default connect(mapStateToProps, null)(ComposeBtn)
