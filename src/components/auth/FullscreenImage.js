import React from 'react'
import { View, Image, StyleSheet } from 'react-native'

function FullscreenImage() {
  return (
    <View style={styles.container}>
      <Image 
        style={styles.image}
        source={require('../../assets/images/nav-bg_final-01.png')} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch'
  },
  
  image: {
    width: '100%',
    flex: 1,
    resizeMode: 'cover'
  }
})

export default FullscreenImage
