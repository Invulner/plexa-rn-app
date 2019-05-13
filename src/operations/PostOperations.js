import PostActions from '../actions/PostActions'
import getAxiosInstance from '../config/axios'
import { API_URL } from '../constants'

const getPost = (id, cb) => {
  return dispatch => {

    return getAxiosInstance().then(api => {
      api.get(`${API_URL}/stories/${id}`)
        .then(response => {
          dispatch(PostActions.savePost(response.data))
          cb()
        }).catch(error => console.log('ERROR: ', error))
    })
  }
}

export default {
  getPost
}
