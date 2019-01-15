import React from 'react'
import { Text } from 'react-native'

export default function PostTextLight(props) {
  const { children, style } = props
  
  return (
    <Text style={[{fontFamily: 'URWGeometric-semibold'}, style]}>
      {children}
    </Text>
  )
}