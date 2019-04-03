import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { LightText } from '../common/fonts'
import profileStyles from '../../assets/styles/profileStyles'

function Button(props) {
  const { onBtnPress, title } = props
  return (
    <View style={profileStyles.detailBox}>
      <TouchableOpacity onPress={onBtnPress}>
        <LightText style={profileStyles.text}>
          {title}
        </LightText>
      </TouchableOpacity>
    </View>
  )
}

export default Button
