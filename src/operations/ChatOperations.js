import ChatActions from '../actions/ChatActions'
import ChatsActions from '../actions/ChatsActions'
import getAxiosInstance from '../config/axios'
import { API_URL } from '../constants'

let roomConnection

const getMessages = (id, page = 1) => {
  return dispatch => {
    dispatch(ChatActions.toggleMessagesLoading(true))

    return getAxiosInstance().then(api => {
      api.get(`${API_URL}/rooms/${id}/messages?page=${page}`)
        .then(response => {
          dispatch(ChatActions.saveMessages(response.data))
          dispatch(ChatActions.updateChatPage(page))
          dispatch(ChatActions.toggleMessagesLoading(false))
        }).catch(error => console.log('getMessages CHAT OPERATION ERROR: ', error))
    })
  }
}

const resetChat = () => {
  return dispatch => {
    dispatch(ChatActions.deleteMessages())
    dispatch(ChatActions.updateChatPage(1))
    roomConnection.unsubscribe()
  }
}

const connectToWs = (chatId) => {
  return dispatch => {
    roomConnection = global.cableInstance.subscriptions.create(
      {
        channel: 'RoomsChannel',
        id: chatId
      },
      {
        received: (data) => {
          dispatch(ChatActions.saveMessage(data))
        }
      }
    )
  }
}

const sendMessage = (chatId, params, ifConnectToWs = false) => {
  return dispatch => {
    dispatch(ChatActions.saveMessage(params)) 

    return getAxiosInstance().then(api => {
      api.post(`${API_URL}/rooms/${chatId}/messages`, params)
        .then(response => {
          dispatch(ChatActions.updateMessage(response.data))
          dispatch(ChatsActions.updateChat(response.data))
          ifConnectToWs && dispatch(connectToWs(chatId))
        }).catch(error => console.log('sendMessage CHAT OPERATION ERROR: ', error))
    })
  }
}

export default {
  getMessages,
  resetChat,
  sendMessage,
  connectToWs
}
