import React, { Component } from 'react'
import { RegularText } from '../fonts'
import { View, StyleSheet, Platform } from 'react-native'
import { BRAND_DARK } from '../../../assets/styles/colors'

class HeaderTitle extends Component {
  state = {
    path: 'feed'
  }

  static getDerivedStateFromProps({ navigation }) {
    if (!navigation) {
      return {
        path: null
      }
    } else if (navigation.getParam('isFeedScreen')) {
      return {
        path: 'feed'
      }
    } else if (navigation.getParam('isResearchFeedScreen')) {
      return {
        path: 'research'
      }
    } else if (navigation.getParam('isChatsScreen')) {
      return {
        path: 'chats'
      }
    } else if (navigation.getParam('isProfileScreen')) {
      return {
        path: 'profile'
      }
    } else return null
  }

  renderTitle = () => {
    const { path } = this.state

    if (!path) return this.props.title

    if (path === 'feed') {
      return 'Feed'
    } else if (path === 'chats') {
      return 'Messages'
    } else if (path === 'research') {
      return 'Research'
    } else if (path === 'profile') {
      return 'Profile'
    }
  }

  render() {
    return (
      <View>
        <RegularText style={styles.text}>
          {this.renderTitle()}
        </RegularText>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: BRAND_DARK,
    marginTop: Platform.OS === 'ios' ? 11 : 4
  }
})

export default HeaderTitle
