import React, { Component } from 'react'
import SafeArea from '../components/common/SafeArea'
import { View } from 'react-native'
import { RegularText } from '../components/common/fonts'

export default class MessagesScreen extends Component {
  render() {
    return (
      <SafeArea>
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <RegularText style={{fontSize: 22}}>Your messages</RegularText>
        </View>
      </SafeArea>
    )
  }
}
