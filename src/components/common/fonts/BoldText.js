import React from 'react'
import { Text } from 'react-native'

function BoldText(props) {
  const { children, style, onPress } = props
  
  return (
    <Text 
      style={[{fontFamily: 'URWGeometric-bold'}, style]}
      onPress={onPress}>
      {children}
    </Text>
  )
}

export default BoldText
