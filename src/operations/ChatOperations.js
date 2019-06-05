import ChatActions from '../actions/ChatActions'
import ChatsActions from '../actions/ChatsActions'
import getAxiosInstance from '../config/axios'
import { API_URL } from '../constants'

let roomConnection

const getMessages = (id, page = 1) => {
  return dispatch => {
    dispatch(ChatsActions.toggleMessagesLoading(true))

    return getAxiosInstance().then(api => {
      api.get(`${API_URL}/rooms/${id}/messages?page=${page}`)
        .then(response => {
          dispatch(ChatsActions.saveMessages(response.data, id, page))
          // dispatch(ChatActions.updateChatPage(page))
          dispatch(ChatsActions.toggleMessagesLoading(false))
        }).catch(error => console.log('getMessages CHAT OPERATION ERROR: ', error))
    })
  }
}

const resetChat = () => {
  return dispatch => {
    dispatch(ChatActions.deleteMessages())
    // dispatch(ChatActions.updateChatPage(1))
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
          dispatch(ChatsActions.saveMessage(data, data.room_id))
          dispatch(ChatsActions.updateChat(data))
        }
      }
    )
  }
}

const sendMessage = (chatId, params, ifConnectToWs = false) => {
  return dispatch => {
    dispatch(ChatsActions.saveMessage(params, chatId)) 

    return getAxiosInstance().then(api => {
      api.post(`${API_URL}/rooms/${chatId}/messages`, params)
        .then(response => {
          // dispatch(ChatActions.updateMessage(response.data))
          // dispatch(ChatsActions.updateChat(response.data))
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
