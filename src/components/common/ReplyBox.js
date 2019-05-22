import React, { Component } from 'react'
import { View, StyleSheet, Image, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import { BRAND_LIGHT } from '../../assets/styles/colors'
import GrayLine from '../common/GrayLine'
import { connect } from 'react-redux'
import CommentOperations from '../../operations/CommentsOperations'
import { BG_COLOR } from '../../assets/styles/colors'
import ChatOperations from '../../operations/ChatOperations'
import utils from '../../utils'
import ChatsOperations from '../../operations/ChatsOperations'

const mapStateToProps = (state) => {
  const { user: { full_name }, chats: { chosenUsers }, comments: { editable } } = state

  return { 
    full_name,
    chosenUsers,
    editable
  }
}

const mapDispatchToProps = (dispatch, { navigation }) => {
  const postComment = (comment) => dispatch(CommentOperations.postComment(comment, navigation))
  const updateComment = (comment) => dispatch(CommentOperations.updateComment(comment))
  const sendMessage = (chatId, messageParams) => dispatch(ChatOperations.sendMessage(chatId, messageParams))
  const createChat = (userIds, messageParams) => dispatch(ChatsOperations.createChat(userIds, messageParams, navigation))

  return { 
    postComment,
    updateComment,
    sendMessage,
    createChat
  }
}

class ReplyBox extends Component {
  state = {
    reply: ''
  }

  componentDidUpdate (prevProps) {
    const { editable } = this.props
    if (editable && (prevProps.editable !== editable)) {
      this.setState({ reply: editable.content })
    }
  }

  onReplyChange = (reply) => {
    this.setState({ reply })
  }

  isEmptyInput = () => {
    const { reply } = this.state

    return !reply.trim().length
  }

  onSubmit = () => {
    const { postComment, updateComment, sendMessage, createChat, type, chatId, full_name, chosenUsers, editable } = this.props
    const reply = this.state.reply.trim()
    const messageParams = {
      text: reply,
      seq_id: utils.getRandomNumber(1000, 100000),
      author: {
        name: full_name
      },
      created_at: new Date().toString()
    }

    switch (type) {
      case 'comment':
        if (editable) {
          updateComment({id: editable.id, content: reply})
        } else {
          postComment(reply)
        }
        break

      case 'existing chat':
        sendMessage(chatId, messageParams)
        break
      
      case 'new chat':
        createChat(chosenUsers, messageParams)
        break
    }

    this.setState({ reply: '' })
  }

  renderPlaceholder = () => {
    const { type, author } = this.props

    if (type === 'comment') {
      return `Reply to ${author}`
    } else if (type === 'new chat' || type === 'existing chat') {
      return `Enter Your Message ...`
    }
  }
  
  render() {
    const { reply } = this.state

    return (
      <KeyboardAvoidingView 
        behavior='padding' 
        keyboardVerticalOffset={90}>
        <GrayLine boxStyle={styles.lineBox}/>

        <View style={styles.container}>
          <View style={styles.inputBox}>

            <TextInput 
              placeholder={this.renderPlaceholder()}
              multiline={true}
              onChangeText={(reply) => this.onReplyChange(reply)}
              style={styles.input}
              value={reply} />

              <TouchableOpacity 
                disabled={this.isEmptyInput()}
                style={styles.iconBox}
                onPress={this.onSubmit}>
                <View style={[styles.icon, !this.isEmptyInput() && styles.inputFocused]}>
                  <Image
                    style={styles.iconImage} 
                    source={require('../../assets/icons/send-button.png')} />
                </View>
              </TouchableOpacity>
          </View>
        </View>   
      </KeyboardAvoidingView>
    )
  }
} 

const styles = StyleSheet.create({
  inputBox: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    backgroundColor: BG_COLOR,
    borderRadius: 20,
    minHeight: 40,
    maxHeight: 100
  },

  container: {
    backgroundColor: '#fff',
    padding: 10
  },

  input: {
    fontSize: 16,
    width: '85%',
    marginBottom: 5
  },

  iconBox: {
    position: 'absolute',
    top: 7,
    right: 10
  },

  icon: {
    width: 25,
    height: 25,
    borderRadius: 25,
    backgroundColor: 'rgba(188, 172, 133, 0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  inputFocused: {
    backgroundColor: BRAND_LIGHT
  },

  iconImage: {
    resizeMode: 'contain',
    width: 15,
    marginTop: 3
  },

  lineBox: {
    paddingHorizontal: 0
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ReplyBox)
