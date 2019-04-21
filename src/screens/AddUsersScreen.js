import React, { Component } from 'react'
import { View, StyleSheet, TextInput } from 'react-native'
import SafeArea from '../components/common/SafeArea'
import { RegularText } from '../components/common/fonts'

class AddUsersScreen extends Component {
  render() {
    return (
      <SafeArea>
        <TextInput 
          style={styles.searhField}
          placeholder='Search user ...' />
        <View style={styles.userBox}></View>
      </SafeArea>
    )
  }
}

const styles = StyleSheet.create({
  searhField: {
    height: 50,
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
    fontSize: 16
  },

  userBox: {
    height: 70, 
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff'
  }
})

export default AddUsersScreen
