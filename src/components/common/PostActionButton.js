import React, { Component } from 'react'
import { Image, StyleSheet, TouchableOpacity, Platform, Alert } from 'react-native'
import ActionSheet from 'react-native-action-sheet'
import { connect } from 'react-redux'
import FeedOperations from '../../operations/FeedOperations'
import CommentsOperations from '../../operations/CommentsOperations'
import PostOperations from '../../operations/PostOperations'
import ChatsActions from '../../actions/ChatsActions'

const mapStateToProps = (state) => {
  const userId = state.user.id
  const chats = state.chats.items
  const { feedData } = state.feed

  return { 
    userId,
    chats,
    feedData
  }
}

const mapDispatchToProps = (dispatch) => {
  const hidePost = (postId, cb) => dispatch(FeedOperations.hidePost(postId, cb))
  const reportPost = (postId, cb) => dispatch(FeedOperations.reportPost(postId, cb))
  const blockUser = (authorId, cb) => dispatch(FeedOperations.blockUser(authorId, cb))
  const deletePost = (postId, cb) => dispatch(FeedOperations.deletePost(postId, cb))
  const getPost = (id, cb) => dispatch(PostOperations.getPost(id, cb))
  const editComment = (id) => dispatch(CommentsOperations.editComment(id))
  const deleteComment = (id, post_id) => dispatch(CommentsOperations.deleteComment(id, post_id))
  const saveChosenUserIds = (userIds) => dispatch(ChatsActions.saveChosenUsers(userIds))

  return {
    hidePost,
    reportPost,
    blockUser,
    deletePost,
    deleteComment,
    getPost,
    editComment,
    saveChosenUserIds
  }
}

class PostActionButton extends Component {
  isOwnPost = () => {
    const { userId, authorId } = this.props

    return userId === authorId
  }

  onAlertOKPress = (option) => {
    const { deletePost, deleteComment, blockUser, hidePost, reportPost, postId, commentId, authorId, navigation } = this.props
    const cb = () => navigation.navigate('Feed')

    switch (option) {
      case 'hide':
        return hidePost(postId, cb)
      case 'report':
        return reportPost(postId, cb)
      case 'block':
        return blockUser(authorId, cb)
      case 'delete':
        return commentId? deleteComment(commentId, postId) : deletePost(postId, cb)
      default:
        console.log('Wrong option or no option passed')
    }
  }

  onEditBtnClick = () => {
    const { getPost, postId, commentId, navigation } = this.props
    if (commentId) {
      this.props.editComment(commentId)
    } else {
      const cb = () => navigation.navigate('Compose', { postId })

      getPost(postId, cb)
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

  getChat = (id) => {

    return this.props.chats.find(chat => {
      let isTwoParticipantsInChat = chat.members.length === 2

      return isTwoParticipantsInChat && chat.members.find(member => member.profile_id === id)
    })
  }

  navigateToChat = (id, title) => {
    this.props.navigation.navigate('Chat', {
      chatId: id,
      chatTitle: title
    })
  }
  
  sendMessage = () => {
    const { authorId, postId, feedData, saveChosenUserIds } = this.props
    const existingChat = this.getChat(authorId)

    if (existingChat) {
      this.navigateToChat(existingChat.id, existingChat.title)
    } else {
      const title = feedData.find(story => story.id === postId).author.full_name

      saveChosenUserIds([authorId])
      this.navigateToChat(null, title)
    }
  }
  
  onBtnPress = (buttonIndex) => {
    const { isMedbot } = this.props

    switch(buttonIndex) {
      case 0:
        if (isMedbot)
          return this.showAlert('hide')
        return this.isOwnPost() ? this.onEditBtnClick() : this.sendMessage()
      case 1:
        if (isMedbot)
          return
        return this.isOwnPost() ? this.showAlert('delete') : this.showAlert('hide')
      case 2:
        return this.isOwnPost() ? null : this.showAlert('report')
      case 3:
        return this.showAlert('block')
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
    const btnsUser = [
      'Edit',
      'Delete'
    ]

    const btnsAndroid = this.props.isMedbot ? btnsMedbot : (this.isOwnPost() ? btnsUser : btnsCommon)
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
    marginTop: -5,
    marginLeft: 'auto',
    padding: 10
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(PostActionButton)
