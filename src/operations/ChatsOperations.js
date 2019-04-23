import ChatsActions from '../actions/ChatsActions'
import getAxiosInstance from '../config/axios'
import { API_URL } from '../constants'

const getChats = () => {
  return dispatch => {
    dispatch(ChatsActions.toggleLoading(true))

    return getAxiosInstance().then(api => {
      api.get(`${API_URL}/rooms`)
        .then(response => {
          console.log(response.data)
          dispatch(ChatsActions.getChats(response.data))
          dispatch(ChatsActions.toggleLoading(false))
        })
    })
  }
}

const getUsers = (q) => {
  return dispatch => {
    console.log(q)
    return getAxiosInstance().then(api => {
      api.get(`${API_URL}/profiles/search?q=${q}`)
        .then(result => {
          console.log(result.data)
          dispatch(ChatsActions.getUsers(result.data))
        }).catch(error => console.log('GET USERS ERROR: ', error ))
    })
  }
}

const createChat = (ids, cb) => {
  return dispatch => {
    const params = {
      type: 'user',
      participants: ids
    }
    console.log(params)
    return getAxiosInstance().then(api => {
      api.post(`${API_URL}/rooms`, params)
        .then(response => {
          console.log('response.data', response.data)
          dispatch(ChatsActions.createChat(response.data))
          cb()
      }).catch(error => console.log('createChat OPERATION ERROR: ', error))
    })
  }
}


export default {
  getChats,
  getUsers,
  createChat
}
