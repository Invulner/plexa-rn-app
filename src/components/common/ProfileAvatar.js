import React from 'react'
import { View, Image, StyleSheet } from 'react-native'
import RegularText from '../common/fonts/RegularText'
import { AVATAR_BG } from '../../assets/styles/colors'
import utils from '../../utils'
import profileStyles from '../../assets/styles/profileStyles'

function ProfileAvatar(props) {
  const { url, name } = props

  return (
    <View style={styles.avatarPlaceholder}>
      {url ? 
        <Image 
          source={{uri: url}}
          style={styles.avatarImage} />
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
    width: 80,
    height: 80,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AVATAR_BG
  },

  avatarImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain'
  }
})

export default ProfileAvatar
