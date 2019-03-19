import React from 'react'
import { View, Image, StyleSheet } from 'react-native'
import RegularText from '../common/fonts/RegularText'
import { AVATAR_BG } from '../../assets/styles/colors'
import utils from '../../utils'
import profileStyles from '../../assets/styles/profileStyles'

function ProfileAvatar(props) {
  const { url, name, isComment, newPost } = props

  return (
    <View style={[styles.avatarPlaceholder, isComment && styles.commentAvatar, newPost && styles.newPostAvatar]}>
      {url ? 
        <Image 
          source={{uri: url}}
          style={[styles.avatarImage, isComment && styles.commentAvatar, newPost && styles.newPostAvatar]} />
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
  },

  commentAvatar: {
    width: 60,
    height: 60
  },

  newPostAvatar: {
    width: 50,
    height: 50
  }
})

export default ProfileAvatar
