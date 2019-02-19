import React, { Component } from 'react'
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native'

class FeedHeaderRight extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => console.log('header message button')}>
          <Image 
            style={styles.messageIcon}
            source={require('../../../assets/icons/envelope-icon-white.png')} />
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
  }
})

export default FeedHeaderRight
