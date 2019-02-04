import React from 'react'
import { Text } from 'react-native'

function LightText(props) {
  const { children, style, onPress } = props
  
  return (
    <Text 
      style={[{fontFamily: 'URWGeometric-light'}, style]}
      onPress={onPress}>
      {children}
    </Text>
  )
}

export default LightText
