import React from 'react'
import { Text } from 'react-native'

function BoldText(props) {
  const { children, style } = props
  
  return (
    <Text style={[{fontFamily: 'URWGeometric-bold'}, style]}>
      {children}
    </Text>
  )
}

export default BoldText
