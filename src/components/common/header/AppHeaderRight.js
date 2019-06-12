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

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.navigation.getParam('isChatsScreen')) {
      console.log(`nextProps.navigation.getParam('isChatsScreen')`, nextProps.navigation.getParam('isChatsScreen'))
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

  // UNSAFE_componentWillReceiveProps(nextProps) {
  //   if (this.props.navigation !== nextProps.navigation) {
  //     console.log('componentWillReceiveProps')
  //     const path = nextProps.navigation.getParam('isFeedScreen') ? 'feed' : 'chats'
  //     this.setState({ path })
  //   }
  // }

  // componentDidUpdate(prevProps) {
  //   if (prevProps.navigation !== this.props.navigation) {
  //     console.log('navigation changed')
  //     const path = this.props.navigation.getParam('isFeedSCreen') ? 'feed' : 'chats'
  //     this.setState({ path })
  //   }
  // }

  componentDidMount() {
    console.log('mount header')
    console.log('this.props.navigation :', this.props.navigation);
  }

  componentWillUnmount() {
    console.log('unmount header')
  }

  render() {
    const { navigation, isConnected, toggleFeedFilter } = this.props
    // const isChatsScreen = navigation.getParam('isChatsScreen')
    // const isFeedScreen = navigation.getParam('isFeedScreen')
    const { path } = this.state
    console.log('render');
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
