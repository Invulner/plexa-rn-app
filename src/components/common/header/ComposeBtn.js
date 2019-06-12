import React, { Component } from 'react'
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

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

  render() {
    const { navigation, isConnected } = this.props

    return (
      <View style={styles.container}>
      {this.state.path === 'feed' &&
        <TouchableOpacity
          disabled={!isConnected} 
          style={styles.addPostButton} 
          onPress={() => navigation.navigate('Compose')}>
          <Image 
            style={styles.addPostIcon}
            source={require('../../../assets/icons/plus.png')} />
        </TouchableOpacity>
      }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'baseline'
  },
  
  addPostIcon: {
    width: 27,
    height: 27
  },
  
  addPostButton: {
    justifyContent: 'center'
  }
})

export default connect(mapStateToProps, null)(ComposeBtn)
