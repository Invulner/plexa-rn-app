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
      const prefix = isConnected ? 'active' : 'inactive'
      
      return like ? `${prefix}-liked` : `${prefix}-unliked`
    }
  }

  return (
    <Image source={src[getIconType()]} style={style} />
  )
}

export default connect(mapStateToProps)(DynamicIcon)
