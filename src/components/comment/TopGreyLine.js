import React from 'react'
import { View, StyleSheet } from 'react-native'

function TopGreyLine(props) {
  return (
    <View style={[styles.lineBox, props.boxStyle]}>
      <View style={styles.greyLine} />
    </View>
  )
}

const styles = StyleSheet.create({
  greyLine: {
    backgroundColor: '#ccc',
    height: 2,
    width: '100%'
  },

  lineBox: {
    height: 2,
    width: '100%',
    paddingHorizontal: 10,
    backgroundColor: '#fff'
  }
})

export default TopGreyLine
