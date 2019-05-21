import React from 'react'
import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import { withNavigation } from 'react-navigation'

function BackArrow(props) {
  return (
    <TouchableOpacity onPress={() => props.navigation.goBack()}>
      <Image 
        source={require('../../../assets/icons/arrow-left.png')}
        style={styles.image} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 20,
    height: 20,
    marginLeft: 5,
    marginBottom: -7,
    resizeMode: 'contain'
  }
})

export default withNavigation(BackArrow)
