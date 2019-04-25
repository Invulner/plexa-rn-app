import ChatActions from '../actions/ChatActions'
import getAxiosInstance from '../config/axios'
import { API_URL } from '../constants'

const getMessages = (id) => {
  return dispatch => {
    dispatch(ChatActions.toggleMessagesLoading(true))

    return getAxiosInstance().then(api => {
      api.get(`${API_URL}/rooms/${id}/messages`)
        .then(response => {
          console.log(response.data)
          dispatch(ChatActions.saveMessages(response.data))
          dispatch(ChatActions.toggleMessagesLoading(false))
        }).catch(error => console.log('getMessages CHAT OPERATION ERROR: ', error))
    })
  }
}

export default {
  getMessages
}
