import ChatsActions from '../actions/ChatsActions'
import getAxiosInstance from '../config/axios'
import { API_URL } from '../constants'
import ChatOperations from '../operations/ChatOperations'

const getChats = () => {
  return dispatch => {
    dispatch(ChatsActions.toggleLoading(true))

    return getAxiosInstance().then(api => {
      api.get(`${API_URL}/rooms`)
        .then(response => {
          dispatch(ChatsActions.getChats(response.data))
          dispatch(ChatsActions.toggleLoading(false))
          console.log('getChats', response.data)
        }).catch(error => console.log('getChats error: ', error))
    }).catch(error => console.log('Axios config error: ', error))
  }
}

const getUsers = (q) => {
  return dispatch => {
    return getAxiosInstance().then(api => {
      api.get(`${API_URL}/profiles/search?q=${q}`)
        .then(result => { 
          dispatch(ChatsActions.getUsers(result.data))
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
    console.log('params', params)
    return getAxiosInstance().then(api => {
      api.post(`${API_URL}/rooms`, params)
        .then(response => {
          navigation.setParams({ chatId: response.data.id })
          console.log('createChat response: ', response.data);
          dispatch(ChatsActions.createChat(response.data))
          dispatch(ChatOperations.sendMessage(response.data.id, messageParams, true))
      }).catch(error => console.log('createChat error: ', error.response))
    }).catch(error => console.log('Axios config error: ', error))
  }
}

export default {
  getChats,
  getUsers,
  createChat
}
