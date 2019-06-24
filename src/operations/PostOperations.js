import PostActions from '../actions/PostActions'
import getAxiosInstance from '../config/axios'
import { API_URL } from '../constants'
import LocationsOperations from './LocationsOperations'

const getPost = (id, cb) => {
  return dispatch => {

    return getAxiosInstance().then(api => {
      api.get(`${API_URL}/stories/${id}`)
        .then(response => {
          dispatch(PostActions.savePost(response.data))
          response.data.location && dispatch(LocationsOperations.saveLocation(response.data.location[0]))
          cb()
        }).catch(error => console.log('ERROR: ', error))
    })
  }
}

export default {
  getPost
}
