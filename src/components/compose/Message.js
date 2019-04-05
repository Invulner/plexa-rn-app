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
  state = {
    contentHeight: 0
  }

  onContentSizeChange = ({ nativeEvent: { contentSize: { width, height } } }) => {
    this.setState({ contentHeight: height })
  }

  render() {
    const { content, saveContent , isFullSpace} = this.props
    const inputHeight = this.state.contentHeight > 140 ? 155 : this.state.contentHeight + 15

    return (
        <TextInput
          placeholder='Enter your message ...'
          style={[styles.input, {height: inputHeight}, isFullSpace && {flex: 1}]}
          multiline={true}
          value={content}
          onContentSizeChange={this.onContentSizeChange}
          onChangeText={content => saveContent(content)} />
    )
  }
}

const styles = StyleSheet.create({
  input: {
    fontSize: 20,
    minHeight: 50,
    paddingBottom: 10,
    paddingHorizontal: 20
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Message)
