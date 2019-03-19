import React, { Component } from 'react'
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { withNavigation } from 'react-navigation'

class FeedHeaderLeft extends Component {
  render() {
    const { navigation } = this.props
    
    return (
      <View style={styles.container}>
        <TouchableOpacity 
          style={styles.addPostButton} 
          onPress={() => navigation.navigate('Compose')}>
          <Image 
            style={styles.addPostIcon}
            source={require('../../../assets/icons/add-post.png')} />
        </TouchableOpacity>
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
  
  addPostIcon: {
    width: 32,
    height: 32
  },
  
  addPostButton: {
    justifyContent: 'center'
  }
})

export default withNavigation(FeedHeaderLeft)
