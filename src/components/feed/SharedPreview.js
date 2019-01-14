import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import PostTextSemibold from './feedFonts/PostTextSemibold'
import PostTextLight from './feedFonts/PostTextLight'

class SharedPreview extends Component {
  render() {
    return (
      <View style={styles.previewContainer}>
        <PostTextSemibold style={styles.sharedTitle}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos qui porro corporis quia dolore voluptate deleniti | BJGP Open
        </PostTextSemibold>
        <PostTextLight style={styles.sharedLink}>
          bjgpopen.org
        </PostTextLight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  previewContainer: {
    borderColor: '#ddd',
    borderRadius: 10,
    borderWidth: 1,
    paddingTop: 10,
    paddingHorizontal: 10,
    paddingBottom: 5,
    marginVertical: 7
  },

  sharedTitle: {
    fontSize: 16,
    letterSpacing: 0.3,
    lineHeight: 14
  },

  sharedLink: {
    fontSize: 14
  }
})

export default SharedPreview
