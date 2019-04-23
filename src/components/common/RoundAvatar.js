import React from 'react'
import { StyleSheet, Image, View } from 'react-native'
import { RegularText } from './fonts'
import utils from '../../utils'
import { BRAND_LIGHT } from '../../assets/styles/colors'

function RoundAvatar(props) {
  const { src, isUserChat, title, size, boxStyle } = props

  const renderInitials = () => {
    if (isUserChat === undefined || isUserChat === true)
      return utils.getInitials(title)
    else
      return 'G'
  }

  return (
    <View style={[styles.titleImageBox, styles[`avatarImage_${size}`], boxStyle]}>
      {!!src ?
        <Image
          style={[styles.avatar, styles[`avatarImage_${size}`]]}
          source={{ uri: src }} />
        :
        <RegularText style={styles.initials}>
          {renderInitials()}
        </RegularText>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  initials: {
    color: '#fff',
    marginTop: 7
  },

  avatar: {
    resizeMode: 'contain'
  },

  titleImageBox: {
    borderRadius: 40,
    backgroundColor: BRAND_LIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    overflow: 'hidden'
  },

  avatarImage_small: {
    height: 20,
    width: 20
  },

  avatarImage_medium: {
    height: 40,
    width: 40
  }
})

export default RoundAvatar
