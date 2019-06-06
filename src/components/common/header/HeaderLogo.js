import React from 'react'
import { View, Image } from 'react-native'

function HeaderLogo() {
  return (
    <View>
      <Image 
        source={require('../../../assets/images/logo-min.png')}
        style={{width: 40, height: 40}} />
    </View>
  )
}

export default HeaderLogo
