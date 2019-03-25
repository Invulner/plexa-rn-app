import React from 'react'
import { TouchableOpacity, Image, StyleSheet } from 'react-native'
import { postIcons } from '../../constants'
import { withNavigation } from 'react-navigation'

function AttachBtn(props) {
  const { navigation, route, iconType, active } = props

  const getSrc = () => {
    return active ? postIcons[`${iconType}-active`] : postIcons[iconType]
  }

  return (
    <TouchableOpacity onPress={() => navigation.navigate(route)}>
      <Image
        source={getSrc()}
        style={styles.iconUpload} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  iconUpload: {
    width: 23,
    height: 23,
    resizeMode: 'contain'
  }
})

export default withNavigation(AttachBtn)
