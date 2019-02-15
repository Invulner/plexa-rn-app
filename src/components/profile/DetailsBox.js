import React from 'react'
import { View } from 'react-native'
import profileStyles from '../../assets/styles/profileStyles'
import { SemiboldText, LightText } from '../../components/common/fonts'
import utils from '../../utils'

function DetailsBox(props) {
  const { detail, detailTitle } = props

  return (
    <View style={profileStyles.detailBox}>
      <SemiboldText style={profileStyles.text}>
        {detailTitle}
      </SemiboldText>
      <LightText style={profileStyles.text}>
        {utils.renderProfileDetails(detail)}
      </LightText>
    </View>
  )
}

export default DetailsBox
