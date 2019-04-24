import React from 'react'
import { View, StyleSheet } from 'react-native'
import { RegularText } from '../fonts'
import { BRAND_DARK } from '../../../assets/styles/colors'

function ChatHeaderTitle(props) {
  const { title, lastMessageDate } = props

  return (
    <View style={styles.container}>
      <RegularText style={styles.title}>
        {title}
      </RegularText>
      <RegularText style={styles.date}>
        {lastMessageDate}
      </RegularText>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },

  title: {
    fontSize: 20,
    color: BRAND_DARK,
    marginVertical: 7
  },

  date: {
    fontSize: 14,
    color: BRAND_DARK
  }
})

export default ChatHeaderTitle
