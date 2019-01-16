import React from 'react'
import { Text } from 'react-native'

function SemiboldText(props) {
  const { children, style } = props
  
  return (
    <Text style={[{fontFamily: 'URWGeometric-semibold'}, style]}>
      {children}
    </Text>
  )
}

export default SemiboldText
