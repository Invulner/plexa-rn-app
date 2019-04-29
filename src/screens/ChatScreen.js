import React, { Component } from 'react'
import { View, StyleSheet, SafeAreaView, TouchableOpacity, Image, ScrollView, FlatList } from 'react-native'
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
  const { loading, page, isLoadingMore } = state.chat

  return { 
    data: getChatMessages(state),
    loading,
    page,
    isLoadingMore
  }
}

const mapDispatchToProps = (dispatch) => {
  const getMessages = (id, page) => dispatch(ChatOperations.getMessages(id, page))
  const deleteMessages = () => dispatch(ChatActions.deleteMessages())
  const toggleisLoadingMore = (flag) => dispatch(ChatActions.toggleIsLoadingMore(flag))
  const resetPage = () => dispatch(ChatActions.resetPage())

  return { 
    getMessages,
    deleteMessages,
    toggleisLoadingMore,
    resetPage
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

  renderListFooter = () => {
    const { isLoadingMore } = this.props

    if (isLoadingMore)
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

  getChatId = () => {
    const { navigation } = this.props

    return navigation.getParam('chatId')
  }

  addMessages = () => {
    const { page, getMessages, isLoadingMore } = this.props

    isLoadingMore && getMessages(this.getChatId(), page + 1)
  }

  componentDidMount() {
    const { getMessages } = this.props

    getMessages(this.getChatId())
  }

  componentWillUnmount() {
    const { toggleisLoadingMore, deleteMessages, resetPage } = this.props
    deleteMessages()
    toggleisLoadingMore(true)
    resetPage()
  }
  
  render() {
    const { data, loading } = this.props

    return (
      <SafeAreaView style={styles.safeArea}>
        {loading && !data.length ?
          <Loader />
          :
          <View style={styles.container}>
          {/* <ScrollView
            contentContainerStyle={styles.list} 
            initialScrollIndex={data.length - 1}>
            {this.renderListFooter()}
            {this.renderItems()}
          </ScrollView> */}
            <FlatList
              data={data}
              contentContainerStyle={styles.list}
              keyExtractor={item => (item.id ? item.id : item.date ) + ''}
              renderItem={this.renderItem}
              inverted={true}
              ListFooterComponent={this.renderListFooter()} />
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
  },

  btn: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: 10,
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
