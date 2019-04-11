import React, { Component } from 'react'
import { Image, StyleSheet, TouchableOpacity, Platform } from 'react-native'
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
  hidePost = () => {
    const { hidePost, postId } = this.props
    
    hidePost(postId)
  }

  reportPost = () => {
    const { reportPost, postId } = this.props

    reportPost(postId)
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
    }, (buttonIndex) => {
      switch(buttonIndex) {
        case 1:
          return this.hidePost()
        case 2:
          return this.reportPost()
      }
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

export default connect(null, mapDispatchToProps)(PostActionButton)
