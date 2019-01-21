import React from 'react'
import { View, Image, StyleSheet } from 'react-native'
import RegularText from '../common/fonts/RegularText'
import utils from '../../utils'

function ProfileAvatar(props) {
  const { url, name } = props

  return (
    <View style={styles.avatarPlaceholder}>
      {url ? 
        <Image 
          source={{uri: url}}
          style={styles.avatarImage}/>
        :
        <RegularText style={styles.initials}>
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
    backgroundColor: '#d3a400'
  },

  avatarImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain'
  },

  initials: {
    color: '#fff',
    fontSize: 26,
    paddingTop: 10
  },
})

export default ProfileAvatar
