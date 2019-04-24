import React, { Component } from 'react'
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { withNavigation } from 'react-navigation'

class HeaderRight extends Component {
  render() {
    const { navigation } = this.props
    const isChatsScreen = navigation.getParam('isChatsScreen')

    return (
      <View style={styles.container}>
      {isChatsScreen &&
        <TouchableOpacity onPress={() => navigation.navigate('AddUsers')}>
          <Image 
            style={styles.messageIcon}
            source={require('../../../assets/icons/add-users.png')} />
        </TouchableOpacity>        
      }
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

export default withNavigation(HeaderRight)
