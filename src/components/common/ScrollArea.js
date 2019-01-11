import React from 'react'
import { ScrollView } from 'react-native'

function ScrollArea(props) {
  return (
    <ScrollView contentContainerStyle={{ padding: 15 }}>
      {props.children}
    </ScrollView>
  )
}

export default ScrollArea
