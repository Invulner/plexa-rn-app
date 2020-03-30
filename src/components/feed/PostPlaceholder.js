import React from 'react'
import { View, StyleSheet, Platform } from 'react-native'
import { RegularText } from '../common/fonts'

function PostPlaceholder(props) {
  return (
    <View style={styles.container}>
      <RegularText style={styles.text}>
        Post was {props.option}
      </RegularText>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 38,
    paddingLeft: 10,
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginTop: 5
  },

  text: {
    fontSize: 16,
    marginTop: Platform.OS === 'ios' ? 7 : -2
  }
})

export default PostPlaceholder
