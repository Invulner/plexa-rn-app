import React, { Component } from 'react'
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  const { isConnected } = state.network

  return { isConnected }
}

class AddUsersBtn extends Component {
  onAddUsersPress = () => this.props.navigation.navigate('AddUsers')

  onFeedFilterPress = () => console.log('pressed')

  render() {
    const { navigation, isConnected } = this.props
    const isChatsScreen = navigation.getParam('isChatsScreen')
    const isFeedScreen = navigation.getParam('isFeedScreen')

    return (
      <TouchableOpacity
        style={styles.container} 
        onPress={isChatsScreen ? this.onAddUsersPress : this.onFeedFilterPress}
        disabled={!isConnected}>
          {isChatsScreen &&
            <Image
              style={styles.addUsersIcon}
              source={require('../../../assets/icons/add-users.png')} />
          }
          {isFeedScreen &&
            <Image
              style={styles.filtersIcon}
              source={require('../../../assets/icons/feed-filters.png')} />
          }
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingRight: 10,
    justifyContent: 'center', 
    alignItems: 'center'
  },

  addUsersIcon: {
    width: 35,
    marginBottom: -12,
    resizeMode: 'contain',
  },

  filtersIcon: {
    width: 27,
    height: 27,
    resizeMode: 'contain'
  }
})

export default connect(mapStateToProps, null)(AddUsersBtn)
