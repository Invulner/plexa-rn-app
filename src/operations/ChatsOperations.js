import ChatsActions from '../actions/ChatsActions'
import getAxiosInstance from '../config/axios'

const getChats = () => {
  return dispatch => {
    dispatch(ChatsActions.toggleLoading(true))

    return getAxiosInstance().then(api => {
      api.get(`/rooms`)
        .then(response => {
          dispatch(ChatsActions.getChats(response.data))
          dispatch(ChatsActions.toggleLoading(false))
        }).catch(error => console.log('getChats error: ', error))
    }).catch(error => console.log('Axios config error: ', error))
  }
}

const getUsers = (q) => { 
  return dispatch => {
    dispatch(ChatsActions.toggleUsersLoading(true))
    return getAxiosInstance().then(api => {
      api.get(`/profiles/search?q=${q}`)
        .then(result => { 
          dispatch(ChatsActions.getUsers(result.data))
          dispatch(ChatsActions.toggleUsersLoading(false))
        }).catch(error => console.log('getUsers error: ', error ))
    }).catch(error => console.log('Axios config error: ', error))
  }
}

const createChat = (ids, messageParams, navigation) => {
  return dispatch => {
    
    const params = {
      type: 'user',
      participants: ids
    }
    
    return getAxiosInstance().then(api => {
      api.post(`/rooms`, params)
        .then(response => {
          navigation.setParams({ chatId: response.data.id })
          dispatch(ChatsActions.createChat(response.data))
          dispatch(sendMessage(response.data.id, messageParams, true))
      }).catch(error => console.log('createChat error: ', error.response))
    }).catch(error => console.log('Axios config error: ', error))
  }
}

let roomConnection

const getMessages = (id, page = 1) => {
  return dispatch => {
    dispatch(ChatsActions.toggleMessagesLoading(true))

    return getAxiosInstance().then(api => {
      api.get(`/rooms/${id}/messages?page=${page}`)
        .then(response => {
          dispatch(ChatsActions.saveMessages(response.data, id, page))
          dispatch(ChatsActions.toggleMessagesLoading(false))
        }).catch(error => console.log('getMessages CHAT OPERATION ERROR: ', error))
    }).catch(error => console.log('Axios config error: ', error))
  }
}

const sendMessage = (chatId, params, ifConnectToWs = false) => {
  return dispatch => {
    dispatch(ChatsActions.saveMessage(params, chatId))

    return getAxiosInstance().then(api => {
      api.post(`/rooms/${chatId}/messages`, params)
        .then(({ data }) => {
          dispatch(ChatsActions.updateChat({last_message: data, unread_count: 0}))
          ifConnectToWs && dispatch(connectToWs(chatId))
        })
        .catch(error => console.log('sendMessage CHAT OPERATION ERROR: ', error.response))
    })
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
          dispatch(ChatsActions.updateChat({last_message: data, unread_count: 0}))
        }
      }
    )
  }
}

const resetChat = () => {
  roomConnection.unsubscribe()
}

export default {
  getChats,
  getUsers,
  createChat,
  getMessages,
  sendMessage,
  connectToWs,
  resetChat
}
