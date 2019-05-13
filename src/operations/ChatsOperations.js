import ChatsActions from '../actions/ChatsActions'
import getAxiosInstance from '../config/axios'
import { API_URL } from '../constants'

const getChats = () => {
  return dispatch => {
    dispatch(ChatsActions.toggleLoading(true))

    return getAxiosInstance().then(api => {
      api.get(`${API_URL}/rooms`)
        .then(response => {
          dispatch(ChatsActions.getChats(response.data))
          dispatch(ChatsActions.toggleLoading(false))
        }).catch(error => console.log('getChats error: ', error))
    }).catch(error => console.log('Axios config error: ', error))
  }
}

const getUsers = (q) => {
  return dispatch => {
    console.log(q)
    return getAxiosInstance().then(api => {
      api.get(`${API_URL}/profiles/search?q=${q}`)
        .then(result => {
          dispatch(ChatsActions.getUsers(result.data))
        }).catch(error => console.log('getUsers error: ', error ))
    }).catch(error => console.log('Axios config error: ', error))
  }
}

const createChat = (ids, cb) => {
  return dispatch => {
    const params = {
      type: 'user',
      participants: ids
    }

    return getAxiosInstance().then(api => {
      api.post(`${API_URL}/rooms`, params)
        .then(response => {
          dispatch(ChatsActions.createChat(response.data))
          const { id, title } = response.data
          cb(id, title)
      }).catch(error => console.log('createChat error: ', error))
    }).catch(error => console.log('Axios config error: ', error))
  }
}


export default {
  getChats,
  getUsers,
  createChat
}
