import PostActions from '../actions/PostActions'
import getAxiosInstance from '../config/axios'
import { API_URL } from '../constants'

const getPost = (id, navigation) => {
  return dispatch => {

    return getAxiosInstance().then(api => {
      api.get(`${API_URL}/stories/${id}`)
        .then(response => {
          console.log(response.data)
          dispatch(PostActions.rewritePost(response.data))
          navigation.navigate('Compose')
        })
    })
  }
}

export default {
  getPost
}
