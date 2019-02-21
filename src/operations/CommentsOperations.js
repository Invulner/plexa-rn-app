import getAxiosInstance from '../config/axios'
import { API_URL } from '../constants'
import CommentsActions from '../actions/CommentsActions'

const getComments = (navigation) => {
  return dispatch => {
    dispatch(CommentsActions.toggleCommentsLoading(true))

    return getAxiosInstance().then(api => {
      const fallBackId = 1093
      const postId = navigation.getParam('postId', fallBackId)

      api.get(`${API_URL}/stories/${postId}/answers`)
        .then(response => {
          dispatch(CommentsActions.saveCommentsData(response.data.answers))
          dispatch(CommentsActions.toggleCommentsLoading(false))
        }).catch(error => console.log('Request error: ', error))
    }).catch(error => console.log('Axios config error: ', error))
  }
}

resetComments = () => {
  return dispatch => {
    dispatch(CommentsActions.resetCommentsData())
  }
}

export default {
  getComments,
  resetComments
}
