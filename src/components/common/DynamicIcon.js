import React from 'react'
import { connect } from 'react-redux'
import { Image } from 'react-native'

const mapStateToProps = (state) => {
  const { isConnected } = state.network

  return { isConnected }
}

function DynamicIcon({ src, isConnected, style, like }) {
  const getIconType = () => {
    if (like === undefined) {
      return isConnected ? 'active' : 'inactive'
    } else {
      if (isConnected) {
        return like ? 'active-liked' : 'active-unliked'
      } else {
        return like ? 'inactive-liked' : 'inactive-unliked'
      }
    }
  }

  return (
    <Image source={src[getIconType()]} style={style} />
  )
}

export default connect(mapStateToProps)(DynamicIcon)
