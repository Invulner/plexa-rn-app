import React from 'react'
import { LightText } from '../common/fonts'
import profileStyles from '../../assets/styles/profileStyles'

function Heading(props) {
  return (
    <LightText style={profileStyles.heading}>
      {props.heading.toUpperCase()}
    </LightText>
  )
}

export default Heading
