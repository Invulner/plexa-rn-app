import React from 'react'
import { Text } from 'react-native'

function ItalicText(props) {
  return (
    <Text style={{ fontStyle: 'italic' }}>
      {props.children}
    </Text>
  )
}

export default ItalicText
