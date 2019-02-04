import React from 'react'
import { Text } from 'react-native'

function SemiboldText(props) {
  const { children, style, onPress } = props
  
  return (
    <Text 
      style={[{fontFamily: 'URWGeometric-semibold'}, style]}
      onPress={onPress}>
      {children}
    </Text>
  )
}

export default SemiboldText
