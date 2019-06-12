import React, { Component } from 'react'
import { TouchableOpacity, Image, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import FeedActions from '../../../actions/FeedActions'

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
    path: 'feed'
  }

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.navigation.getParam('isChatsScreen')) {
      return {
        path: 'chats'
      }
    } else if (nextProps.navigation.getParam('isFeedScreen')) {
      return {
        path: 'feed'
      }
    } else return null
  }

  onBtnPress = () => {
    const { navigation, toggleFeedFilter } = this.props

    return navigation.getParam('isFeedScreen') ? toggleFeedFilter : this.onAddUsersPress
  }

  onAddUsersPress = () => this.props.navigation.navigate('AddUsers')

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
              source={require('../../../assets/icons/add-users.png')} />
          }
          {path === 'feed' &&
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
