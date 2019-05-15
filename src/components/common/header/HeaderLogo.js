import React from 'react'
import { Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  const { isConnected } = state.network

  return { isConnected }
}

function HeaderLogo(props) {
  const { navigation, isConnected } = props
  const onFeedLogoPress = navigation.getParam('onLogoPress')

  const onLogoPress = () => {
    onFeedLogoPress ? onFeedLogoPress() : navigation.navigate('Feed')
  }

  return (
    <TouchableOpacity
      disabled={!isConnected && onFeedLogoPress}
      onPress={onLogoPress}>
      <Image 
        source={require('../../../assets/images/logo-min.png')}
        style={{width: 40, height: 40}} />
    </TouchableOpacity>
  )
}

export default connect(mapStateToProps, null)(HeaderLogo)
