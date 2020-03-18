import React, { Component } from 'react'
import { TextInput, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import PostActions from '../../actions/PostActions'

const mapStateToProps = (state) => {
  const { content } = state.post

  return { content }
}

const mapDispatchToProps = (dispatch) => {
  const saveContent = (content) => dispatch(PostActions.saveContent(content))

  return { saveContent }
}

class Message extends Component {
  render() {
    const { content, saveContent, noImage } = this.props

    return (
      <TextInput
        placeholder='Enter your message ...'
        style={[styles.input, noImage && { minHeight: 285 }]}
        multiline={true}
        value={content}
        scrollEnabled={false}
        onChangeText={content => saveContent(content)} />
    )
  }
}

const styles = StyleSheet.create({
  input: {
    fontSize: 20,
    minHeight: 50,
    paddingBottom: 10,
    paddingHorizontal: 20,
    textAlignVertical: 'top'
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Message)
