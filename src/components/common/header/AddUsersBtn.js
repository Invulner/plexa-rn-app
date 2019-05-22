import React, { Component } from 'react'
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  const { isConnected } = state.network

  return { isConnected }
}

class AddUsersBtn extends Component {
  render() {
    const { navigation, isConnected } = this.props
    const isChatsScreen = navigation.getParam('isChatsScreen')

    return (
      <View style={styles.container}>
        {isChatsScreen &&
          <TouchableOpacity
            disabled={!isConnected}
            onPress={() => navigation.navigate('AddUsers')}>
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

export default connect(mapStateToProps, null)(AddUsersBtn)
