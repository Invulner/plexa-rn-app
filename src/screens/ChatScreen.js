import React, { Component } from 'react'
import { View, StyleSheet, SafeAreaView, TouchableOpacity, Image, FlatList } from 'react-native'
import { connect } from 'react-redux'
import utils from '../utils'
import { RegularText } from '../components/common/fonts'
import { BG_COLOR, GRAY } from '../assets/styles/colors'
import RoundAvatar from '../components/common/RoundAvatar'
import { makeGetChatMessages } from '../selectors/ChatMessages'
import Loader from '../components/common/Loader'
import { MESSAGES_IN_PAGE } from '../constants'
import ReplyBox from '../components/common/ReplyBox'
import ChatsActions from '../actions/ChatsActions'
import ChatsOperations from '../operations/ChatsOperations'

const mapStateToProps = () => {
  const getChatMessages = makeGetChatMessages()
  
  return (state, { navigation }) => {
    const { page, messagesLoading: loading } = state.chats
    const { isCableConnected, isConnected } = state.network

    return { 
      data: getChatMessages(state, navigation),
      loading,
      page,
      isCableConnected,
      isConnected
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  const getMessages = (id, page) => dispatch(ChatsOperations.getMessages(id, page))
  const connectToWs = (chatId) => dispatch(ChatsOperations.connectToWs(chatId))
  const toggleLoading = (flag) => dispatch(ChatsActions.toggleMessagesLoading(flag))

  return { 
    getMessages,
    connectToWs,
    toggleLoading
  }
}

class ChatScreen extends Component {
  renderItem = ({ item }) => {
    if (item.date)
      return (
        <RegularText style={styles.chatDate}>
          {utils.formatChatDate(item.date)}
        </RegularText>
      )
    else if (item.isUser)
      return (
        <View style={[styles.userMessage, item.isNextMessage && styles.nextUserMessage]}>
          {this.renderMessage(item.text)}
          {this.renderTime(item.created_at)}
        </View>
      )
    else
      return (
        <View style={styles.publicOuterBox}>
          {!item.isNextMessage &&
            <RoundAvatar
              src={item.author.avatar}
              title={item.author.name}
              size='small'
              boxStyle={{ marginRight: 5 }} />
          }
          <View style={[styles.publicUserMessage, item.isNextMessage && styles.nextPublicUserMessage]}>
            {this.renderMessage(item.text)}
            {this.renderTime(item.created_at)}
          </View>
        </View>
      )
  }

  renderMessage = (text) => {
    return (
      <RegularText style={styles.text}>
        {text}
      </RegularText>
    )
  }

  renderTime = (time) => {
    return (
      <RegularText style={styles.time}>
        {utils.formatTime(time)}
      </RegularText>
    )
  }

  renderListFooter = () => {
    if (!this.isLoadingMore())
      return
    
    if (this.props.loading) {
      return <Loader />
    } else {
      return (
        <TouchableOpacity
          style={styles.btn}
          onPress={this.addMessages}>
          <Image
            source={require('../assets/icons/load-more.png')}
            style={styles.loadIcon} />
          <RegularText style={styles.btnText}>
            Load previous messages
          </RegularText>
        </TouchableOpacity>
      )
    }
  }

  isLoadingMore = () => { 
    const { page, data } = this.props
    let arr = data.filter(item => !item.date)

    return page * MESSAGES_IN_PAGE === arr.length
  }

  getChatId = () => {
    return this.props.navigation.getParam('chatId')
  }

  addMessages = () => {
    const { page, getMessages } = this.props

    this.isLoadingMore() && getMessages(this.getChatId(), page + 1)
  }

  componentDidMount() {
    const { getMessages, toggleLoading, navigation, isCableConnected, connectToWs, isConnected } = this.props

    if (this.getChatId()) {
      isConnected && getMessages(this.getChatId())
      if (isCableConnected) {
        connectToWs(this.getChatId())
      }
    } else if (!this.getChatId() || !isConnected) {
      toggleLoading(false)
    }
    navigation.setParams({ isChatScreen: true })
  }

  componentDidUpdate(prevProps) {
    const { isCableConnected, connectToWs, isConnected, getMessages } = this.props

    if (prevProps.isCableConnected !== isCableConnected && isCableConnected) {
      connectToWs(this.getChatId())
    }

    if(prevProps.isConnected !== this.props.isConnected && isConnected) {
      getMessages(this.getChatId())
    }
  }

  componentWillUnmount() {
    this.getChatId() && ChatsOperations.resetChat()
    this.props.navigation.setParams({ isChatScreen: false })
  }
  
  render() {
    const { data, loading, navigation, isConnected } = this.props

    return (
      <SafeAreaView style={styles.safeArea}>
        {loading && !data.length && this.getChatId() && isConnected ?
          <Loader />
          :
          <View style={styles.container}>
            <FlatList
              data={data}
              contentContainerStyle={styles.list}
              keyExtractor={item => (item.id ? item.id : (item.date ? item.date : item.text)) + ''}
              renderItem={this.renderItem}
              inverted={true}
              ListFooterComponent={this.renderListFooter()} />
            
            <ReplyBox
              navigation={navigation}
              chatId={this.getChatId()}
              type={this.getChatId() ? 'existing chat' : 'new chat'} />
              
          </View>
        }
      </SafeAreaView>
    )
  }
}

const time = {
  fontSize: 12,
  color: GRAY
}

const messageBox = {
  borderRadius: 10,
  paddingVertical: 5,
  paddingHorizontal: 10,
  marginBottom: 10,
  maxWidth: '80%'
}

const styles = StyleSheet.create({
  userMessage: {
    ...messageBox,
    backgroundColor: '#ece8dd',
    borderTopRightRadius: 0,
    alignSelf: 'flex-end'
  },

  publicUserMessage: {
    ...messageBox,
    backgroundColor: BG_COLOR,
    borderTopLeftRadius: 0
  },

  text: {
    fontSize: 16,
    marginTop: 5
  },

  container: {
    flex: 1
  },

  time: {
    alignSelf: 'flex-end',
    ...time
  },

  publicOuterBox: {
    alignSelf: 'flex-start',
    flexDirection: 'row'
  },

  nextPublicUserMessage: {
    marginLeft: 35,
    borderTopLeftRadius: 10,
    marginTop: -7
  },

  nextUserMessage: {
    borderTopRightRadius: 10,
    marginTop: -7
  },

  chatDate: {
    alignSelf: 'center',
    marginVertical: 10,
    ...time
  },

  safeArea: {
    flex: 1
  },

  list: {
    paddingHorizontal: 10
  },

  btn: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginVertical: 13,
    backgroundColor: 'transparent'
  },

  btnText: {
    fontSize: 16,
    color: GRAY
  },

  loadIcon: {
    width: 15, 
    height: 15, 
    resizeMode: 'contain',
    marginRight: 10
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen)
