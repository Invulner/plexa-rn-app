import React from 'react'
import { Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import FeedOperations from '../../../operations/FeedOperations'

const mapDispatchToProps = (dispatch) => {
  const refreshFeed = () => dispatch(FeedOperations.refreshFeed())

  return { refreshFeed }
}

function HeaderLogo(props) {
  const { navigation, refreshFeed } = props
  const { index } = navigation.state
  const scrollToTop = navigation.getParam('scrollToTop')

  const onLogoPress = () => {
    if (index === 0) {
      scrollToTop()
      refreshFeed()
    } else {
      navigation.navigate('Feed')
    } 
  }

  return (
    <TouchableOpacity onPress={onLogoPress}>
      <Image 
        source={require('../../../assets/images/logo-min.png')}
        style={{width: 40, height: 40}} />
    </TouchableOpacity>
  )
}

export default connect(null, mapDispatchToProps)(HeaderLogo)
