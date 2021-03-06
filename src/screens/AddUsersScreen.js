import React, { Component } from 'react'
import { View, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image, Platform } from 'react-native'
import SafeArea from '../components/common/SafeArea'
import ChatsOperations from '../operations/ChatsOperations'
import RoundAvatar from '../components/common/RoundAvatar'
import debounce from 'lodash.debounce'
import { connect } from 'react-redux'
import { RegularText } from '../components/common/fonts'
import ChatsActions from '../actions/ChatsActions'
import IconChecked from '../components/common/IconChecked'
import utils from '../utils'
import { BG_COLOR } from '../assets/styles/colors'
import Loader from '../components/common/Loader'
import { KeyboardAccessoryNavigation } from 'react-native-keyboard-accessory'
import SearchPlaceholder from '../components/common/SearchPlaceholder'
import GrayLine from '../components/common/GrayLine'

const mapStateToProps = (state) => {
  const userId = state.user.id
  const { users, usersLoading, items } = state.chats

  return { 
    users,
    items,
    usersLoading,
    userId
  }
}

const mapDispatchToProps = (dispatch) => {
  const getUsers = (q) => dispatch(ChatsOperations.getUsers(q))
  const deleteUsers = () => dispatch(ChatsActions.deleteUsers())
  const saveChosenUserIds = (userIds) => dispatch(ChatsActions.saveChosenUsers(userIds))
  const toggleChosenUsersFlag = (flag) => dispatch(ChatsActions.toggleChosenUsersFlag(flag))

  return { 
    getUsers,
    deleteUsers,
    saveChosenUserIds,
    toggleChosenUsersFlag
  }
}

class AddUsersScreen extends Component {
  state = {
    input: '',
    chosenUsers: [],
    placeholder: false
  }

  toggleUser = (user) => {
    this.setState(({ chosenUsers }) => {
      let newUsers

      if (utils.findItemById(chosenUsers, user.id))
        newUsers = chosenUsers.filter(item => item.id !== user.id)
      else
        newUsers = [...chosenUsers, user]

      return { chosenUsers: newUsers }
    }, () => this.props.toggleChosenUsersFlag(!!this.state.chosenUsers.length))
  }

  renderChosenUsers = () => {
    const { chosenUsers } = this.state

    if (chosenUsers.length)
      return chosenUsers.map(user => {
        return (
          <TouchableOpacity
            key={user.id}
            onPress={() => this.toggleUser(user)}>
            <Image
              style={styles.removeIcon}
              source={require('../assets/icons/close-image-brand-light.png')} />
            <RoundAvatar
              size='medium'
              src={user.avatar_url}
              title={user.full_name} />
          </TouchableOpacity>
        )
      })
  }

  getUsers = debounce(input => this.props.getUsers(input), 1000)

  onInputChange = (input) => {
    this.setState({ input }, () => this.processUsers(input))
  }
  
  processUsers = (input) => {
    if (input) {
      this.getUsers(input)
    } else {
      this.props.deleteUsers()
      this.getUsers.cancel()
    }
  }

  isUserChosen = (id) => {
    const { chosenUsers } = this.state

    return utils.findItemById(chosenUsers, id)
  }
  
  renderUsers = () => {
    const { users } = this.props

    if (users.length) {
      return users.map(user => {
        return (
          <TouchableOpacity 
            style={styles.userBox}
            key={user.id}
            onPress={() => this.toggleUser(user)}>
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
    
    if (this.state.placeholder) {
      return (
        <React.Fragment>
          <GrayLine />
          <SearchPlaceholder message='Your search did not have any results' />
        </React.Fragment>
      )
    }
  }

  getChosenUserIds = () => {
    return this.state.chosenUsers.map(user => user.id)
  }

  getChat = () => {
    const { items, userId } = this.props
    const chat = items.find(chat => {
      let memberIds = chat.members.map(member => member.profile_id).filter(id => id !== userId)

      return utils.areArrOfNumsEqual(memberIds, this.getChosenUserIds())
    })

    return chat
  }

  onSubmit = () => {
    const { chosenUsers } = this.state
    const { navigation, saveChosenUserIds } = this.props
    const chat = this.getChat()

    if (chat) {
      navigation.navigate('Chat', {
        chatId: chat.id,
        chatTitle: utils.truncate(chat.title, 20) 
      })
    } else {
      const title = chosenUsers.map(user => user.full_name).join(', ')

      saveChosenUserIds(this.getChosenUserIds())
      navigation.navigate('Chat', {
        chatTitle: utils.truncate(title, 20)
      })
    }
  }

  componentDidMount() {
    this.props.navigation.setParams({
      isAddUsersScreen: true,
      onDonePress: this.onSubmit
    })
  }

  componentDidUpdate(prevProps, prevState) {
    const { users, usersLoading } = this.props

    if (prevProps.usersLoading && !usersLoading && !users.length) {
      this.setState({ placeholder: true })
    }

    if (prevState.input && !this.state.input) {
      this.setState({ placeholder: false })
    }
  }

  componentWillUnmount() {
    const { deleteUsers, navigation, toggleChosenUsersFlag } = this.props
    
    deleteUsers()
    toggleChosenUsersFlag(false)
    navigation.setParams({
      isAddUsersScreen: false
    })
  }
  
  render() {
    const { input, chosenUsers } = this.state
    const { users, usersLoading } = this.props

    return (
      <SafeArea>
        <TextInput
          value={input} 
          style={[styles.searhField, users.length && { marginBottom: 10 }, ]}
          placeholder='Search user ...'
          onChangeText={this.onInputChange} />
        {!!chosenUsers.length &&
          <View style={styles.horizontalScrollViewBox}>
            <ScrollView
              horizontal={true}
              contentContainerStyle={styles.chosenUsers}>
              {this.renderChosenUsers()}
            </ScrollView>
          </View>
        }
        <ScrollView contentContainerStyle={styles.userList}>
          {usersLoading ?
            <Loader style={{marginTop: 15}} />
            :
            this.renderUsers()
          }
        </ScrollView>
        <KeyboardAccessoryNavigation
          inSafeAreaView={true}
          nextHidden={true}
          previousHidden={true} />
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
    marginTop: Platform.OS === 'ios'? 8 : -1
  },

  leftBox: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  chosenUsers: {
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 20
  },

  horizontalScrollViewBox: {
    height: 85
  },

  userList: {
    backgroundColor: BG_COLOR
  },

  removeIcon: {
    position: 'relative',
    left: 33,
    top: 5,
    width: 13,
    height: 13,
    resizeMode: 'contain'
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(AddUsersScreen)
