import React, { Component } from 'react'
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { withNavigation } from 'react-navigation'

class FeedHeaderLeft extends Component {
  render() {
    const { navigation } = this.props
    
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image 
            style={styles.menuImage}
            source={require('../../../assets/icons/menu.png')} />
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
  
  menuImage: {
    width: 30,
    height: 20,
    resizeMode: 'contain'
  }
})

export default withNavigation(FeedHeaderLeft)
