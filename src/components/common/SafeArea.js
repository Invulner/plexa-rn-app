import React from 'react'
import { SafeAreaView } from 'react-native'
import { BG_COLOR } from '../../assets/styles/colors'

function SafeArea(props) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: BG_COLOR}}>
      {props.children}
    </SafeAreaView>
  )
}

export default SafeArea
