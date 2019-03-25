import React, { Component } from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import ProfileAvatar from '../common/ProfileAvatar'
import PostActions from '../../actions/PostActions'

const mapStateToProps = (state) => {
  const { full_name: name, avatar_url: url } = state.user
  const { content } = state.post

  return {
    name,
    url,
    content
  }
}

const mapDispatchToProps = (dispatch) => {
  const saveContent = (content) => dispatch(PostActions.saveContent(content))

  return { saveContent }
}

class Message extends Component {
  render() {
    const { name, url, content, saveContent } = this.props

    return (
      <View style={styles.inputBox}>
        <TextInput
          placeholder='Enter your message ...'
          style={styles.input}
          multiline={true}
          value={content}
          onChangeText={content => saveContent(content.trim())} />

        <ProfileAvatar
          url={url}
          name={name}
          size={'small'} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  inputBox: {
    paddingTop: 20,
    paddingLeft: 10,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    minHeight: 325
  },

  input: {
    fontSize: 20,
    width: '80%',
    alignSelf: 'stretch'
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Message)
