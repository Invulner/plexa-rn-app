import ChatActions from '../actions/ChatActions'
import getAxiosInstance from '../config/axios'
import { API_URL } from '../constants'

const getMessages = (id, page = 1) => {
  return dispatch => {
    dispatch(ChatActions.toggleMessagesLoading(true))

    return getAxiosInstance().then(api => {
      api.get(`${API_URL}/rooms/${id}/messages?page=${page}`)
        .then(response => {
          console.log('response.data :', response.data)
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
  }
}

const sendMessage = (chatId, params) => {
  return dispatch => {
    dispatch(ChatActions.saveMessage(params))
    console.log('params', params)

    return getAxiosInstance().then(api => {
      api.post(`${API_URL}/rooms/${chatId}/messages`, params)
        .then(response => {
          console.log(response.data)
          dispatch(ChatActions.updateMessage(response.data))
        }).catch(error => console.log('sendMessage CHAT OPERATION ERROR: ', error))
    })
  }
}

export default {
  getMessages,
  resetChat,
  sendMessage
}
