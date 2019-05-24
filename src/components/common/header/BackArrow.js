import React from 'react'
import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import { withNavigation } from 'react-navigation'

function BackArrow({ navigation }) {
  const isChatScreen = navigation.getParam('isChatScreen')
  const onBackArrowPress = () => {
    return isChatScreen ? () => navigation.navigate('Chats') : () => navigation.goBack()
  }

  return (
    <TouchableOpacity onPress={onBackArrowPress()}>
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
    resizeMode: 'contain',
    padding: 10
  }
})

export default withNavigation(BackArrow)
