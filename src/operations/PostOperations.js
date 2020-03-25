import PostActions from '../actions/PostActions'
import getAxiosInstance from '../config/axios'
import LocationsOperations from './LocationsOperations'

const getPost = (id, cb) => {
  return dispatch => {

    return getAxiosInstance().then(api => {
      api.get(`/stories/${id}`)
        .then(response => {
          dispatch(PostActions.savePost(response.data))
          response.data.location && dispatch(LocationsOperations.saveLocation(response.data.location[0]))
          cb()
        }).catch(error => console.log('ERROR: ', error))
    }).catch(error => console.log('Axios config error: ', error))
  }
}

export default {
  getPost
}
