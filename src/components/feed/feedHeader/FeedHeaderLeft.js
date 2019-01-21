import React, { Component } from 'react'
import { View, Image, StyleSheet } from 'react-native'

class FeedHeaderLeft extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image 
          style={styles.menuImage}
          source={require('../../../assets/icons/menu.png')} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'baseline'
  },
  
  menuImage: {
    width: 30,
    height: 20,
    resizeMode: 'contain'
  }
})

export default FeedHeaderLeft
