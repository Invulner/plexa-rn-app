import React from 'react'
import { Image, TouchableOpacity } from 'react-native'
import { withNavigation } from 'react-navigation'

function HeaderLogo(props) {
  const { navigation } = props
  const onFeedLogoPress = navigation.getParam('onLogoPress')

  const onLogoPress = () => {
    onFeedLogoPress ? onFeedLogoPress() : navigation.navigate('Feed')
  }

  return (
    <TouchableOpacity onPress={onLogoPress}>
      <Image 
        source={require('../../../assets/images/logo-min.png')}
        style={{width: 40, height: 40}} />
    </TouchableOpacity>
  )
}

export default withNavigation(HeaderLogo)
