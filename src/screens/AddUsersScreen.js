import React, { Component } from 'react'
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import SafeArea from '../components/common/SafeArea'
import ChatsOperations from '../operations/ChatsOperations'
import RoundAvatar from '../components/common/RoundAvatar'
import debounce from 'lodash.debounce'
import { connect } from 'react-redux'
import { RegularText } from '../components/common/fonts'
import ChatsActions from '../actions/ChatsActions'
import IconChecked from '../components/common/IconChecked'

const mapStateToProps = (state) => {
  const { users } = state.chats

  return { users }
}

const mapDispatchToProps = (dispatch) => {
  const getUsers = (q) => dispatch(ChatsOperations.getUsers(q))
  const deleteUsers = () => dispatch(ChatsActions.deleteUsers())
  const createChat = (ids, cb) => dispatch(ChatsOperations.createChat(ids, cb))

  return { 
    getUsers,
    deleteUsers,
    createChat
  }
}

class AddUsersScreen extends Component {
  state = {
    input: '',
    userIds: []
  }

  addUser = (id) => {
    this.setState(({ userIds }) => {
      let newUserIds

      if (userIds.includes(id)) 
        newUserIds = userIds.filter(item => item !== id)
      else 
        newUserIds = [...userIds, id]

      return {
        userIds: newUserIds
      }
    })
  }

  renderChosenUsers = () => {
    const { users } = this.props
    const userArr = users.filter(user => this.isUserChosen(user.id))

    if (userArr.length)
      return userArr.map(user => {
        return (
          <RoundAvatar
            size='medium'
            src={user.avatar_url}
            title={user.full_name}
            key={user.id}
            boxStyle={{ marginBottom: 15 }} />
        )
      })
  }

  getUsers = debounce(input => this.props.getUsers(input), 1000)

  onInputChange = (input) => {
    this.setState({ input }, () => this.toggleUsers(input))
  }
  
  toggleUsers = (input) => {
    if (input) {
      this.getUsers(input)
    } else {
      this.props.deleteUsers()
      this.setState({ userIds: [] })
      this.getUsers.cancel()
    }
  }

  isUserChosen = (id) => {
    const { userIds } = this.state

    return userIds.includes(id)
  }
  
  renderUsers = () => {
    const { users } = this.props

    return users.map(user => {
      return (
        <TouchableOpacity 
          style={styles.userBox}
          key={user.id}
          onPress={() => this.addUser(user.id)}>
          <View style={styles.leftBox}>
            <RoundAvatar
              src={user.avatar_url}
              title={user.full_name}
              size='medium' />
            <RegularText style={styles.name}>
              {user.full_name}
            </RegularText>
          </View>
          {this.isUserChosen(user.id) && <IconChecked />}
        </TouchableOpacity>
      )
    })
  }

  onSubmit = () => {
    const { createChat, navigation } = this.props
    const { userIds } = this.state
    //Redirect to screen with chat (we do not have this screen yet)
    const cb = () => navigation.navigate('Chats')

    createChat(userIds, cb)
  }

  componentDidMount() {
    this.props.navigation.setParams({
      onDonePress: this.onSubmit
    })
  }

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
        <View style={styles.chosenUsers}>
          {this.renderChosenUsers()}
        </View> 
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
    backgroundColor: '#fff',
    fontSize: 16
  },

  userBox: {
    height: 60, 
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginBottom: 2,
    justifyContent: 'space-between'
  },

  name: {
    fontSize: 18,
    marginTop: 8
  },

  leftBox: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  chosenUsers: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    paddingTop: 15
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(AddUsersScreen)
