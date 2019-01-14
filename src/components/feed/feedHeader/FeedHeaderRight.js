import React, { Component } from 'react'
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native'

class FeedHeaderRight extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity 
          style={styles.messageButton} 
          onPress={() => console.log('header message button')}>
          <Image 
            style={styles.messageIcon}
            source={require('../../../assets/icons/envelope-icon-white.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.addPostButton} 
          onPress={() => console.log('header right add post')}>
          <Image 
            style={styles.addPostIcon}
            source={require('../../../assets/icons/add-post.png')}
          />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingRight: 10, 
    flexDirection: 'row'
  },

  messageIcon: {
    width: 20, 
    resizeMode: 'contain',
  },

  addPostIcon: {
    width: 32,
    height: 32
  },

  messageButton: {
    paddingRight: 20
  },
  
  addPostButton: {
    justifyContent: 'center'
  }
})

export default FeedHeaderRight
