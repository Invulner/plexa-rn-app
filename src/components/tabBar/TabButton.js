import React from 'react'
import { StyleSheet, TouchableOpacity, Image } from 'react-native'
import { tabIcons } from '../../constants'
import { withNavigation } from 'react-navigation'

function TabButton(props) {
  const { iconType, route, navigation, tabIndex } = props

  getSrc = () => {
    return tabIndex === navigation.state.index ? iconType + '-active' : iconType
  }

  return (
    <TouchableOpacity 
      style={styles.iconBox} 
      onPress={() => {
        navigation.navigate(route)
      }}>
      <Image 
        style={styles.messageIcon}
        source={tabIcons[getSrc()]} />
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
  }
})

export default withNavigation(TabButton)
