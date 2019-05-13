import React, { Component } from 'react'
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { RegularText, SemiboldText } from '../components/common/fonts'
import { BG_COLOR, GRAY, LIGHT_GRAY } from '../assets/styles/colors'
import { connect } from 'react-redux'
import ChatsOperations from '../operations/ChatsOperations'
import utils from '../utils'
import { LinearGradient } from 'expo'
import Loader from '../components/common/Loader'
import RoundAvatar from '../components/common/RoundAvatar'
import { NavigationEvents } from 'react-navigation'

const mapStateToProps = (state) => {
  const { items, loading } = state.chats
  const sortedChats = !!items && items.sort(utils.sortByTime({ field: 'last_message_date', order: 'desc' }))

  return { 
    sortedChats,
    loading
  }
}

const mapDispatchToProps = (dispatch) => {
  const getChats = () => dispatch(ChatsOperations.getChats())

  return { getChats }
}

class ChatsScreen extends Component {
  isUserChat = (item) => {
    return item.type === 'user'
  }

  renderSeparator = () => {
    return (
      <LinearGradient
        colors={['#d3d3d3', 'transparent']}
        style={styles.separator}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }} />
    )
  }

  onChatPress = (item, title) => {
    const { navigation } = this.props

    navigation.navigate('Chat', { 
      chatId: item.id,
      chatTitle: utils.truncate(title, 20)
    })
  }

  renderTitle = (item, title) => {
    if (item.members.length > 2 && this.isUserChat(item) || !this.isUserChat(item))
      return 'G'
    else
      return title
  }

  renderChats = () => {
    const { sortedChats } = this.props

    return sortedChats.map((item, index, array) => {
      const { title } = this.isUserChat(item) ? item : item.group
      const avatarSrc = item.members ? item.members[0].avatar : null

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
              <View>
                <SemiboldText style={styles.text}>
                  {utils.truncate(title, 25)}
                </SemiboldText>
                <RegularText style={styles.message}>
                  {item.last_message ? item.last_message.text : null}
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

  componentDidMount() {
    // this.props.getChats()
  }

  render() {
    const { loading } = this.props

    return (
      <View style={styles.container}>
        <NavigationEvents
          onDidFocus={this.setNavParams}
          onDidBlur={this.resetNavParams} />
        {loading ?
          <Loader />
          :
          <ScrollView contentContainerStyle={styles.scrollView}>
            <View style={styles.chatsBox}>
              {this.renderChats()}
            </View>
          </ScrollView>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR
  },

  chatsBox: {
    backgroundColor: '#fff',
    borderRadius: 5
  },

  text: {
    fontSize: 18
  },

  message: {
    color: GRAY
  },

  date: {
    color: LIGHT_GRAY
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
  },

  separator: {
    height: 1,
    marginHorizontal: 10
  },

  scrollView: {
    backgroundColor: BG_COLOR,
    paddingVertical: 15,
    paddingHorizontal: 10
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ChatsScreen)
