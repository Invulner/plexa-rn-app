import React from 'react'
import { Image, StyleSheet } from 'react-native'

function IconChecked() {
  return (
    <Image
      style={styles.icon}
      source={require('../../assets/icons/checked.png')} />
  )
}

const styles = StyleSheet.create({
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain'
  }
})

export default IconChecked
