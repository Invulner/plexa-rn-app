import React, { Component } from 'react'
import { View, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native'
import { BRAND_LIGHT } from '../../assets/styles/colors'
import GreyLine from '../common/GreyLine'
import { connect } from 'react-redux'
import CommentOperations from '../../operations/CommentsOperations'
import { BG_COLOR } from '../../assets/styles/colors'
import ChatOperations from '../../operations/ChatOperations'

const mapStateToProps = (state) => {
  const { full_name } = state.user

  return { full_name }
}

const mapDispatchToProps = (dispatch, { navigation }) => {
  const postComment = (comment) => dispatch(CommentOperations.postComment(comment, navigation))
  const sendMessage = (chatId, params) => dispatch(ChatOperations.sendMessage(chatId, params))

  return { 
    postComment,
    sendMessage
  }
}

class ReplyBox extends Component {
  state = {
    reply: ''
  }

  onReplyChange = (reply) => {
    this.setState({ reply })
  }

  isEmptyInput = () => {
    const { reply } = this.state

    return !reply.trim().length
  }

  onSubmit = () => {
    const { postComment, sendMessage, type, chatId, full_name } = this.props
    const reply = this.state.reply.trim()

    switch (type) {
      case 'comment':
        postComment(reply)
      break

      case 'chat':
        const params = {
          text: reply,
          seq_id: 1, //required number, but we don't use it
          author: {
            name: full_name
          },
          created_at: new Date().toString()
        }
        sendMessage(chatId, params)
      break
    }

    this.setState({ reply: '' })
  }

  renderPlaceholder = () => {
    const { type, author } = this.props

    switch (type) {
      case 'comment':
        return `Reply to ${author}`
      case 'chat':
        return `Enter Your Message ...`
    }
  }
  
  render() {
    const { reply } = this.state

    return (
      <React.Fragment>
          <GreyLine boxStyle={styles.lineBox}/>
  
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
      </React.Fragment>
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
