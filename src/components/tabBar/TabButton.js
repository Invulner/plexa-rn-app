import React from 'react'
import { StyleSheet, TouchableOpacity, Image } from 'react-native'
import { tabIcons } from '../../constants'
import { withNavigation } from 'react-navigation'
import { BRAND_DARK } from '../../assets/styles/colors'

function TabButton(props) {
  const { iconType, route, navigation, tabIndex } = props

  return (
    <TouchableOpacity 
      style={[styles.iconBox, tabIndex === navigation.state.index && styles.active]} 
      onPress={() => navigation.navigate(route)}>
      <Image 
        style={styles.messageIcon}
        source={tabIcons[iconType]} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  messageIcon: {
    width: 30, 
    resizeMode: 'contain'
  },

  iconBox: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    flex: 1
  },

  active: {
    borderTopWidth: 3,
    borderColor: BRAND_DARK
  }
})

export default withNavigation(TabButton)
