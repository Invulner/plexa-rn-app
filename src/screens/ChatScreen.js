import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import SafeArea from '../components/common/SafeArea'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  const { items } = state.chats

  return { items }
}


class ChatScreen extends Component {
  render() {
    return (
      <SafeArea>

      </SafeArea>
    )
  }
}

export default connect(mapStateToProps, null)(ChatScreen)
