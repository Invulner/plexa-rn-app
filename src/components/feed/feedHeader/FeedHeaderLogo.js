import React from 'react'
import { Image, TouchableOpacity } from 'react-native'
import { withNavigation } from 'react-navigation'

function FeedHeaderLogo(props) {
  return (
    <TouchableOpacity onPress={() => props.navigation.navigate('Feed')}>
      <Image 
        source={require('../../../assets/images/logo-min.png')}
        style={{width: 40, height: 40}} />
    </TouchableOpacity>
  )
}

export default withNavigation(FeedHeaderLogo)
