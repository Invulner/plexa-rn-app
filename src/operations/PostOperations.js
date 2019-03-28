import getAxiosInstance from '../config/axios'
import PostActions from '../actions/PostActions'
import { API_URL } from '../constants'

const postWithImage = (image, cb) => {
  return dispatch => {
    const optionalHeaders = {
      'Content-Type': 'multipart/form-data'
    }

    return getAxiosInstance(optionalHeaders).then(api => {
      api.post(`${API_URL}/stories/images`, image)
        .then(response => {
          dispatch(PostActions.setImage(response.data.id))
          cb()
        })
    })
  }
}

export default {
  postWithImage
}
