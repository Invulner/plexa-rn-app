import ChatsActions from '../actions/ChatsActions'
import getAxiosInstance from '../config/axios'
import { API_URL } from '../constants'

const getChats = () => {
  return dispatch => {
    dispatch(ChatsActions.toggleLoading(true))

    return getAxiosInstance().then(api => {
      api.get(`${API_URL}/rooms`)
        .then(result => {
          console.log(result)
          dispatch(ChatsActions.getChats(result.data))
          dispatch(ChatsActions.toggleLoading(false))
        })
    })
  }
}

export default {
  getChats
}
