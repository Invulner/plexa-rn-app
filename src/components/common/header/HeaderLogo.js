import React from 'react'
import { View, Image, Platform } from 'react-native'

function HeaderLogo() {
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <Image 
        source={require('../../../assets/images/logo-min.png')}
        style={{width: 40, height: 40, marginLeft: Platform.OS === 'ios' ? 0 : -50}} />
    </View>
  )
}

export default HeaderLogo
