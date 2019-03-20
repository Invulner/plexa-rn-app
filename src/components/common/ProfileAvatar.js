import React from 'react'
import { View, Image, StyleSheet } from 'react-native'
import RegularText from '../common/fonts/RegularText'
import { AVATAR_BG } from '../../assets/styles/colors'
import utils from '../../utils'
import profileStyles from '../../assets/styles/profileStyles'

function ProfileAvatar(props) {
  const { url, name, size } = props

  return (
    <View style={[styles.avatarPlaceholder, styles[size]]}>
      {url ? 
        <Image 
          source={{uri: url}}
          style={[styles.avatarImage, styles[size]]} />
        :
        <RegularText style={profileStyles.initials}>
          {utils.getInitials(name)}
        </RegularText>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  avatarPlaceholder: {
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AVATAR_BG
  },

  avatarImage: {
    resizeMode: 'contain'
  },

  default: {
    width: 80,
    height: 80,
  },

  medium: {
    width: 60,
    height: 60
  },

  small: {
    width: 50,
    height: 50
  }
})

export default ProfileAvatar
