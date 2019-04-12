import React, { Component } from 'react'
import { Image, StyleSheet, TouchableOpacity, Platform, Alert } from 'react-native'
import ActionSheet from 'react-native-action-sheet'
import { connect } from 'react-redux'
import FeedOperations from '../../operations/FeedOperations'

const mapDispatchToProps = (dispatch) => {
  const hidePost = (postId) => dispatch(FeedOperations.hidePost(postId))
  const reportPost = (postId) => dispatch(FeedOperations.reportPost(postId))

  return {
    hidePost,
    reportPost
  }
}

class PostActionButton extends Component {
  onAlertOKPress = (option) => {
    const { hidePost, reportPost, postId } = this.props

    switch (option) {
      case 'hide':
        return hidePost(postId)
      case 'report':
        return reportPost(postId)
      default:
        return console.log('block user')
    }
  }

  showAlert = (option) => { 
    const title = 'Are you sure?'
    const message = `After pressing OK you won't see this any more`
    const config = [
      {
        text: 'Cancel',
        style: 'cancel'
      },
      {
        text: 'OK',
        onPress: () => this.onAlertOKPress(option)
      }
    ]

    Alert.alert(title, message, config)
  }

  onBtnPress = (buttonIndex) => {
    const { isMedbot } = this.props

    switch(buttonIndex) {
      case 0:
        return isMedbot ? this.showAlert('hide') : console.log('send message')
      case 1:
        return this.showAlert('hide')
      case 2:
        return this.showAlert('report')
      case 3:
        return this.showAlert()
    }
  }

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
    }, this.onBtnPress)
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

export default connect(null, mapDispatchToProps)(PostActionButton)
