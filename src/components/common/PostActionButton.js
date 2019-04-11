import React, { Component } from 'react'
import { Image, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import ActionSheet from 'react-native-action-sheet'

class PostActionButton extends Component {
  callActionsSheet = () => {
    const btnsCommon = [
      'Send message',
      'Hide post',
      'Report',
      'Block user'
    ]
    const btnsMedbot = ['Hide post']

    const btnsAndroid = this.props.isMedbot ? btnsMedbot : btnsCommon
    const btnsIOS = [
      ...btnsAndroid,
      'Cancel'
    ]


    const cancelIndex = btnsIOS.length - 1

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
          source={require('../../assets/icons/ico1-01.png')}
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
