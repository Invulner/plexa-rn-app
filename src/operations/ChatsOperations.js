import ChatsActions from '../actions/ChatsActions'
import getAxiosInstance from '../config/axios'
import { API_URL } from '../constants'

const getChats = () => {
  return dispatch => {

    return getAxiosInstance().then(api => {
      api.get(`${API_URL}/rooms`)
        .then(result => {
          console.log(result)
          dispatch(ChatsActions.getChats(result.data))
        })
    })
  }
}

export default {
  getChats
}
