import React, { Component } from 'react'
import { View, StyleSheet, SafeAreaView, FlatList } from 'react-native'
import { connect } from 'react-redux'
import ChatOperations from '../operations/ChatOperations'
import utils from '../utils'
import { RegularText } from '../components/common/fonts'
import { BG_COLOR, GRAY } from '../assets/styles/colors'
import RoundAvatar from '../components/common/RoundAvatar'
import ChatActions from '../actions/ChatActions'
import { getChatMessages } from '../selectors/ChatMessages'
import Loader from '../components/common/Loader'

const mapStateToProps = (state) => {
  const { loading, page } = state.chat
  const { full_name: userName } = state.user

  return { 
    data: getChatMessages(state),
    loading,
    page,
    userName
  }
}

const mapDispatchToProps = (dispatch) => {
  const getMessages = (id, page) => dispatch(ChatOperations.getMessages(id, page))
  const deleteMessages = () => dispatch(ChatActions.deleteMessages())
  const updatePage = () => dispatch(ChatActions.updateChatPage())

  return { 
    getMessages,
    deleteMessages,
    updatePage
  }
}

class ChatScreen extends Component {
  renderItem = ({ item }) => {
    if (item.isUser)
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
            title='User'
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

  getChatId = () => {
    const { navigation } = this.props

    return navigation.getParam('chatId')
  }

  addMessages = () => {
    const { page, getMessages, updatePage } = this.props

    getMessages(this.getChatId(), page + 1)
    updatePage()
  }

  componentDidMount() {
    const { getMessages } = this.props

    getMessages(this.getChatId())
  }

  componentWillUnmount() {
    this.props.deleteMessages()
  }
  
  render() {
    const { data, loading } = this.props

    return (
      <SafeAreaView style={styles.safeArea}>
        {loading && !data.length ?
          <Loader />
          :
          <View style={styles.container}>
            <RegularText style={styles.chatDate}>
              Example date
            </RegularText>

            <FlatList
              data={data}
              contentContainerStyle={styles.list}
              keyExtractor={item => item.id + ''}
              renderItem={this.renderItem}
              onEndReachedThreshold={0}
              onEndReached={this.addMessages}
              ListFooterComponent={loading && <Loader />} />
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
    paddingVertical: 10,
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
    marginBottom: 10,
    ...time
  },

  safeArea: {
    flex: 1
  },

  list: {
    paddingHorizontal: 10
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen)
