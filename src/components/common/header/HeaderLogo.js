import React from 'react'
import { Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  const { isConnected } = state.network

  return { isConnected }
}

function HeaderLogo(props) {
  const { navigation, isConnected } = props
  const isFeedScreen = navigation.getParam('isFeedScreen')
  const onFeedLogoPress = navigation.getParam('onLogoPress')

  const onLogoPress = () => {
    isFeedScreen ? onFeedLogoPress() : navigation.navigate('Feed')
  }

  return (
    <TouchableOpacity
      disabled={!isConnected && isFeedScreen}
      onPress={onLogoPress}>
      <Image 
        source={require('../../../assets/images/logo-min.png')}
        style={{width: 40, height: 40}} />
    </TouchableOpacity>
  )
}

export default connect(mapStateToProps, null)(HeaderLogo)
