import PostActions from '../actions/PostActions'
import getAxiosInstance from '../config/axios'
import { API_URL } from '../constants'

const getPost = (id, navigation) => {
  return dispatch => {

    return getAxiosInstance().then(api => {
      api.get(`${API_URL}/stories/${id}`)
        .then(response => {
          console.log(response.data)
          dispatch(PostActions.savePostToModify(response.data))
          navigation.navigate('Compose', { postId: id })
        }).catch(error => console.log('ERROR: ', error))
    })
  }
}

export default {
  getPost
}
