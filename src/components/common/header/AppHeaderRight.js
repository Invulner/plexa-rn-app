import React, { Component } from 'react'
import { TouchableOpacity, Image, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import FeedActions from '../../../actions/FeedActions'

const mapStateToProps = (state) => {
  const { isConnected } = state.network

  return { isConnected }
}

const mapDispatchToProps = (dispatch) => {
  const toggleFeedFilter = (flag) => dispatch(FeedActions.toggleFilter(flag))

  return { toggleFeedFilter }
}

class AppHeaderRight extends Component {
  onAddUsersPress = () => this.props.navigation.navigate('AddUsers')

  render() {
    const { navigation, isConnected, toggleFeedFilter } = this.props
    const isChatsScreen = navigation.getParam('isChatsScreen')
    const isFeedScreen = navigation.getParam('isFeedScreen')

    return (
      <TouchableOpacity
        style={styles.container} 
        onPress={isChatsScreen ? this.onAddUsersPress : toggleFeedFilter}
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

export default connect(mapStateToProps, mapDispatchToProps)(AppHeaderRight)
