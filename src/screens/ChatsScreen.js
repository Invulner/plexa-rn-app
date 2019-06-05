import React, { Component } from 'react'
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { RegularText, SemiboldText } from '../components/common/fonts'
import { GRAY, LIGHT_GRAY } from '../assets/styles/colors'
import { connect } from 'react-redux'
import ChatsOperations from '../operations/ChatsOperations'
import utils from '../utils'
import Loader from '../components/common/Loader'
import RoundAvatar from '../components/common/RoundAvatar'
import { NavigationEvents } from 'react-navigation'
import commonStyles from '../assets/styles/common'
import Badge from '../components/common/Badge'

const mapStateToProps = (state) => {
  const { items, loading } = state.chats
  const { isConnected } = state.network
  const sortedChats = !!items && items.sort(utils.sortByTime({ field: 'last_message_date', order: 'desc' }))

  return { 
    sortedChats,
    loading,
    isConnected
  }
}

const mapDispatchToProps = (dispatch) => {
  const getChats = () => dispatch(ChatsOperations.getChats())
  const resetUnreadCount = (data) => dispatch(ChatsOperations.updateChat(data))

  return { getChats, resetUnreadCount }
}

class ChatsScreen extends Component {
  isUserChat = (item) => {
    return item.type === 'user'
  }

  renderSeparator = () => {
    return (
      <View style={commonStyles.separatorLine} />
    )
  }

  onChatPress = (item, title) => {
    const { navigation } = this.props

    navigation.navigate('Chat', { 
      chatId: item.id,
      chatTitle: utils.truncate(title, 20)
    })

    this.props.resetUnreadCount({room_id: item.id, reset_count: true})
  }

  getChatAvatar = (item, title) => {
    const member = item.members.find(member => member.name === title)
    return member ? member.avatar : null
  }

  renderTitle = (item, title) => {
    if (!this.isUserChat(item) || item.members.length > 2 && this.isUserChat(item))
      return 'G'
    else
      return title
  }

  renderChats = () => {
    const { sortedChats } = this.props

    return sortedChats.map((item, index, array) => {
      const { title } = this.isUserChat(item) ? item : item.group
      const avatarSrc = item.members ? this.getChatAvatar(item, title) : null

      return (
        <React.Fragment key={item.id}>
          <TouchableOpacity
            onPress={() => this.onChatPress(item, title)} 
            style={styles.chatBox}>
            <View style={styles.leftBox}>
              <RoundAvatar 
                isUserChat={this.isUserChat(item)}
                title={this.renderTitle(item, title)}
                src={avatarSrc}
                size='medium' />
              {!!item.unread_count &&
                <Badge boxStyle={styles.badge} value={item.unread_count}/>
              }
              <View>
                <SemiboldText style={styles.text}>
                  {utils.truncate(title, 25)}
                </SemiboldText>
                <RegularText style={styles.message}>
                  {item.last_message ? utils.truncate(item.last_message.text, 30) : null}
                </RegularText>
              </View>

            </View>
            <RegularText style={styles.date}>
              {utils.formatDate(item.last_message_date)}
            </RegularText>

          </TouchableOpacity>
          {index !== array.length - 1 && this.renderSeparator()}
        </React.Fragment>
      )
    })
  }

  getParentNavigation = () => {
    return this.props.navigation.dangerouslyGetParent()
  }

  setNavParams = () => {
    this.getParentNavigation().setParams({
      isChatsScreen: true
    })
  }
  
  resetNavParams = () => {
    this.getParentNavigation().setParams({
      isChatsScreen: false
    })
  }

  // componentDidMount() {
  //   const { isConnected, getChats } = this.props
    
  //   isConnected && getChats()
  // }

  render() {
    const { loading } = this.props

    return (
      <React.Fragment>
        <NavigationEvents
          onDidFocus={this.setNavParams}
          onDidBlur={this.resetNavParams} />
        {loading ?
          <Loader />
          :
          <ScrollView>
            {this.renderChats()}
          </ScrollView>
        }
      </React.Fragment>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 18
  },

  message: {
    color: GRAY
  },

  date: {
    color: LIGHT_GRAY
  },

  badge: {
    bottom: 2,
    left: 26
  },

  leftBox: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  chatBox: {
    height: 70, 
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between'
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ChatsScreen)
