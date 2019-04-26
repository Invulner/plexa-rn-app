import ChatActions from '../actions/ChatActions'
import getAxiosInstance from '../config/axios'
import { API_URL } from '../constants'

const getMessages = (id, page = 1) => {
  return dispatch => {
    console.log('page :', page)
    dispatch(ChatActions.toggleMessagesLoading(true))

    return getAxiosInstance().then(api => {
      api.get(`${API_URL}/rooms/${id}/messages?page=${page}`)
        .then(response => {
          console.log(response.data)
          if (response.data.length)
            dispatch(ChatActions.saveMessages(response.data))
          else
            dispatch(ChatActions.toggleIsLoadingMore(false))
          dispatch(ChatActions.toggleMessagesLoading(false))
        }).catch(error => console.log('getMessages CHAT OPERATION ERROR: ', error))
    })
  }
}

export default {
  getMessages
}
