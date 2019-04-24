import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import SafeArea from '../components/common/SafeArea'
import { connect } from 'react-redux'
import ChatOperations from '../operations/ChatOperations'
import utils from '../utils'

const mapStateToProps = (state) => {
  const { messages } = state.chat

  return { messages }
}

const mapDispatchToProps = (dispatch) => {
  const getMessages = (id) => dispatch(ChatOperations.getMessages(id))

  return { getMessages }
}


class ChatScreen extends Component {
  componentDidMount() {
    const { navigation, getMessages } = this.props
    const chatId = navigation.getParam('chatId')
    
    getMessages(chatId)
  }
  
  render() {
    return (
      <SafeArea>

      </SafeArea>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen)
