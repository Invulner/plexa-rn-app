import React from 'react'
import { StyleSheet, Image, View } from 'react-native'
import { RegularText } from './fonts'
import utils from '../../utils'
import { BRAND_LIGHT } from '../../assets/styles/colors'

function RoundAvatar(props) {
  const { src, isUserChat, title } = props

  const renderInitials = () => {
    if (isUserChat === undefined || isUserChat === true)
      return utils.getInitials(title)
    else
      return 'G'
  }

  return (
    <View style={styles.titleImageBox}>
      {!!src ?
        <Image
          style={styles.avatar}
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
    height: 40,
    width: 40,
    resizeMode: 'contain'
  },

  titleImageBox: {
    height: 40,
    width: 40,
    borderRadius: 40,
    backgroundColor: BRAND_LIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    overflow: 'hidden'
  }
})

export default RoundAvatar
