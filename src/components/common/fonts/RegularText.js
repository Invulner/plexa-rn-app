import React from 'react'
import { Text } from 'react-native'

function RegularText(props) {
  const { children, style } = props
  
  return (
    <Text style={[{fontFamily: 'URWGeometric-regular'}, style]}>
      {children}
    </Text>
  )
}

export default RegularText
