import React from 'react'
import { Image, View, StyleSheet } from 'react-native'
import { LightText } from '../common/fonts'

function Social() {
  return (
    <View style={styles.socialContainer}>
      <Image 
        source={require('../../assets/icons/like-icon.png')}
        style={styles.icon}
      />
      <LightText style={styles.likeCounter}>
        0
      </LightText>
      <Image 
        source={require('../../assets/icons/comments.png')}
        style={styles.icon}
      />
      <LightText>
        3
      </LightText>
    </View>
  )
}

const styles = StyleSheet.create({
  icon: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
    marginRight: 7,
    marginLeft: 10,
    marginBottom: 8
  },

  socialContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10
  },

  likeCounter: {
    marginRight: 30
  }
})

export default Social
