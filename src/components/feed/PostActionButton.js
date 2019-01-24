import React, { Component } from 'react'
import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import ActionSheet from 'react-native-action-sheet'
import { Platform } from 'react-native'

class PostActionButton extends Component {
  callActionsSheet = () => {
    const btnsIOS = [
      'Send message',
      'Hide post',
      'Report',
      'Block user',
      'Cancel'
    ]
  
    const btnsAndroid = [
      'Send message',
      'Hide post',
      'Report',
      'Block user'
    ]

    const cancelIndex = 4

    ActionSheet.showActionSheetWithOptions({
      options: (Platform.OS == 'ios') ? btnsIOS : btnsAndroid,
      cancelButtonIndex: cancelIndex,
      tintColor: 'blue'
    }, (buttonIndex) => {
      console.log('button clicked :', buttonIndex)
    })
  }

  render() {
    return (
      <TouchableOpacity 
        onPress={this.callActionsSheet}
        style={styles.actionBtn}>
        <Image
          source={require('../../assets/icons/arrow-down.png')}
          style={styles.actionIcon} />
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  actionIcon: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
  },

  actionBtn: {
    marginTop: 5,
    marginLeft: 'auto',
  }
})

export default PostActionButton
