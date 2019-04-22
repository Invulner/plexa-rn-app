import React, { Component } from 'react'
import { View, StyleSheet, TextInput } from 'react-native'
import SafeArea from '../components/common/SafeArea'
import ChatsOperations from '../operations/ChatsOperations'
import RoundAvatar from '../components/common/RoundAvatar'
import debounce from 'lodash.debounce'
import { connect } from 'react-redux'
import { RegularText } from '../components/common/fonts'
import ChatsActions from '../actions/ChatsActions'

const mapDispatchToProps = (dispatch) => {
  const getUsers = (q) => dispatch(ChatsOperations.getUsers(q))
  const deleteUsers = () => dispatch(ChatsActions.deleteUsers())

  return { 
    getUsers,
    deleteUsers
  }
}

const mapStateToProps = (state) => {
  const { users } = state.chats

  return { users }
}


class AddUsersScreen extends Component {
  state = {
    input: ''
  }

  onInputChange = (input) => {
    this.setState({ input }, () => this.toggleUsers(input))
  }
  
  toggleUsers = (input) => {
    input ? this.getUsers(input) : this.getUsers.cancel()
  }
  
  renderUsers = () => {
    const { users } = this.props

    return users.map(user => {
      return (
        <View 
          style={styles.userBox}
          key={user.id}>
          <RoundAvatar
            src={user.avatar_url}
            title={user.full_name} />
          <RegularText style={styles.name}>
            {user.full_name}
          </RegularText>
        </View>
      )
    })
  }

  getUsers = debounce(input => this.props.getUsers(input), 1000)

  componentWillUnmount() {
    this.props.deleteUsers()
  }
  
  
  render() {
    const { input } = this.state
    const { users } = this.props

    return (
      <SafeArea>
        <TextInput
          value={input} 
          style={styles.searhField}
          placeholder='Search user ...'
          onChangeText={this.onInputChange} />
          {!!users.length && this.renderUsers()}
      </SafeArea>
    )
  }
}

const styles = StyleSheet.create({
  searhField: {
    height: 50,
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
    fontSize: 16
  },

  userBox: {
    height: 60, 
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginBottom: 2
  },

  name: {
    fontSize: 18,
    marginTop: 5
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(AddUsersScreen)
