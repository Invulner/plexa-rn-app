import React, { Component } from 'react'
import { RegularText } from '../fonts'
import { View, StyleSheet } from 'react-native'
import { BRAND_DARK } from '../../../assets/styles/colors'

function HeaderTitle({ title, navigation }) {
  const renderTitle = () => {
    if (title) return title

    const isFeedScreen = navigation.getParam('isFeedScreen')
    const isChatsScreen = navigation.getParam('isChatsScreen')
    const isProfileScreen = navigation.getParam('isProfileScreen')
    const isResearchFeedScreen = navigation.getParam('isResearchFeedScreen')

    if (isFeedScreen) {
      return 'Feed'
    } else if (isChatsScreen) {
      return 'Messages'
    } else if (isResearchFeedScreen) {
      return 'Research'
    } else if (isProfileScreen) {
      return 'Profile'
    }
  }
  return (
    <View>
      <RegularText style={styles.text}>
        {renderTitle()}
      </RegularText>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: BRAND_DARK,
    marginTop: 10
  }
})

export default HeaderTitle
