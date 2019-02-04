import React from 'react'
import { Text } from 'react-native'

function RegularText(props) {
  const { children, style, onPress } = props
  
  return (
    <Text 
      style={[{fontFamily: 'URWGeometric-regular'}, style]}
      onPress={onPress}>
      {children}
    </Text>
  )
}

export default RegularText
