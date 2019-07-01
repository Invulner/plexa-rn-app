import React, { Component } from 'react'
import { TouchableOpacity, Image, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import FeedActions from '../../../actions/FeedActions'
import { addUsersButton, feedFilterButton } from '../../../constants'

const mapStateToProps = (state) => {
  const { isConnected } = state.network

  return { isConnected }
}

const mapDispatchToProps = (dispatch) => {
  const toggleFeedFilter = () => dispatch(FeedActions.toggleFilter())

  return { toggleFeedFilter }
}

class AppHeaderRight extends Component {
  state = {
    path: null
  }

  static getDerivedStateFromProps({ navigation }) {
    const isChatsScreen = navigation.getParam('isChatsScreen')
    const isFeedScreen = navigation.getParam('isFeedScreen')
    const isResearchFeedScreen = navigation.getParam('isResearchFeedScreen')
    const isPropfileScreen = navigation.getParam('isProfileScreen')

    if (isChatsScreen) {
      return {
        path: 'chats'
      }
    } else if (isFeedScreen) {
      return {
        path: 'feed'
      }
    } else if (isResearchFeedScreen || isPropfileScreen) {
      return {
        path: null
      }
    } else return null
  }

  onBtnPress = () => {
    const { navigation, toggleFeedFilter } = this.props

    return navigation.getParam('isFeedScreen') ? toggleFeedFilter : this.onAddUsersPress
  }

  onAddUsersPress = () => this.props.navigation.navigate('AddUsers')

  getIcon = () => {
    return this.props.isConnected ? 'active' : 'inactive'
  }

  render() {
    const { isConnected } = this.props
    const { path } = this.state

    return (
      <TouchableOpacity
        style={styles.container} 
        onPress={this.onBtnPress()}
        disabled={!isConnected}>
          {path === 'chats' &&
            <Image
              style={styles.addUsersIcon}
              source={addUsersButton[this.getIcon()]} />
          }
          {path === 'feed' &&
            <Image
              style={styles.filtersIcon}
              source={feedFilterButton[this.getIcon()]} />
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
    marginBottom: -13,
    resizeMode: 'contain',
  },

  filtersIcon: {
    marginTop: 5,
    width: 27,
    height: 27,
    resizeMode: 'contain'
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(AppHeaderRight)
