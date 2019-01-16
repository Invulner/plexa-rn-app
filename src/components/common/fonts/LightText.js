import React from 'react'
import { Text } from 'react-native'

function LightText(props) {
  const { children, style } = props
  
  return (
    <Text style={[{fontFamily: 'URWGeometric-light'}, style]}>
      {children}
    </Text>
  )
}

export default LightText
