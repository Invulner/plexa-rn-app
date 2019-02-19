import React, { Component } from 'react'
import SafeArea from '../components/common/SafeArea'
import { View } from 'react-native'
import { RegularText } from '../components/common/fonts'

export default class ResearchFeedScreen extends Component {
  render() {
    return (
      <SafeArea>
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <RegularText style={{fontSize: 22}}>Research Feed</RegularText>
        </View>
      </SafeArea>
    )
  }
}
