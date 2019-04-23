import React, { Component } from 'react'
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { withNavigation } from 'react-navigation'

class FeedHeaderRight extends Component {
  render() {
    const { navigate } = this.props.navigation

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigate('AddUsers')}>
          <Image 
            style={styles.messageIcon}
            source={require('../../../assets/icons/add-users.png')} />
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
    width: 35, 
    resizeMode: 'contain',
  }
})

export default withNavigation(FeedHeaderRight)
