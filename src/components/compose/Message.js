import React, { Component } from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import ProfileAvatar from '../common/ProfileAvatar'

const mapStateToProps = (state) => {
  const { full_name: name, avatar_url: url } = state.user

  return {
    name,
    url
  }
}

class Message extends Component {
  render() {
    const { name, url, value } = this.props

    return (
      <View style={styles.inputBox}>
        <TextInput
          placeholder='Enter your message ...'
          style={styles.input}
          multiline={true}
          value={value}
          onChangeText={message => this.props.onTextChange(message)} />

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

export default connect(mapStateToProps, null)(Message)
