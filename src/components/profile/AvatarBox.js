import React from 'react'
import { View, Image, StyleSheet } from 'react-native'
import { RegularText } from '../common/fonts'
import utils from '../../utils'
import profileStyles from '../../assets/styles/profileStyles'
import { AVATAR_BG } from '../../assets/styles/colors'

function AvatarBox(props) {
  const { avatar_url, full_name} = props

  return (
    <View style={styles.container}>
      <View style={profileStyles.userBox}>

        <View style={styles.avatarPlaceholder}>
          {!!avatar_url ? 
            <Image 
              source={{uri: avatar_url}}
              style={profileStyles.userImage} />
            :
            <RegularText style={profileStyles.initials}>
              {full_name && utils.getInitials(full_name)}
            </RegularText>
            }
        </View>

        <RegularText style={styles.userName}>
          {full_name}
        </RegularText>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15
  },

  userName: {
    ...profileStyles.userName,
    marginLeft: 'auto'
  },

  avatarPlaceholder: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AVATAR_BG,
    borderRadius: 7
  }
})

export default AvatarBox
