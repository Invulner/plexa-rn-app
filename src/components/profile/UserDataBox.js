import React from 'react'
import { View } from 'react-native'
import { SemiboldText, LightText } from '../../components/common/fonts'
import profileStyles from '../../assets/styles/profileStyles'

function UserDataBox(props) {
  const { title, data } = props

  return (
    <View style={profileStyles.profileDetailBox}>
      <SemiboldText style={profileStyles.text}>
        {title}
      </SemiboldText>
      <LightText style={profileStyles.profileDetails}>
        {data}
      </LightText>
    </View>
  )
}

export default UserDataBox
