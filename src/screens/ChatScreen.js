import React, { Component } from 'react'
import { View, StyleSheet, SafeAreaView, TouchableOpacity, Image, FlatList } from 'react-native'
import { connect } from 'react-redux'
import ChatOperations from '../operations/ChatOperations'
import utils from '../utils'
import { RegularText } from '../components/common/fonts'
import { BG_COLOR, GRAY } from '../assets/styles/colors'
import RoundAvatar from '../components/common/RoundAvatar'
import { getChatMessages } from '../selectors/ChatMessages'
import Loader from '../components/common/Loader'
import { MESSAGES_IN_PAGE } from '../constants'

const mapStateToProps = (state) => {
  const { loading, page } = state.chat

  return { 
    data: getChatMessages(state),
    loading,
    page
  }
}

const mapDispatchToProps = (dispatch) => {
  const getMessages = (id, page) => dispatch(ChatOperations.getMessages(id, page))
  const resetChat = () => dispatch(ChatOperations.resetChat())

  return { 
    getMessages,
    resetChat
  }
}

class ChatScreen extends Component {
  renderItem = ({ item }) => {
    if (item.date)
      return (
        <RegularText style={styles.chatDate}>
          {utils.formatChatDate(item.date, 'isFullDate')}
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
    if (this.isLoadingMore())
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
    this.props.getMessages(this.getChatId())
  }

  componentWillUnmount() {
    this.props.resetChat()
  }
  
  render() {
    const { data, loading } = this.props

    return (
      <SafeAreaView style={styles.safeArea}>
        {loading && !data.length ?
          <Loader />
          :
          <View style={styles.container}>
            <FlatList
              data={data}
              contentContainerStyle={styles.list}
              keyExtractor={item => (item.id ? item.id : item.date ) + ''}
              renderItem={this.renderItem}
              inverted={true}
              ListFooterComponent={loading ? <Loader /> : this.renderListFooter()} />
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
