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
          console.log(response.data)
          dispatch(CommentsActions.saveCommentsData(response.data))
          dispatch(CommentsActions.toggleCommentsLoading(false))
        }).catch(error => console.log('Request error: ', error))
    }).catch(error => console.log('Axios config error: ', error))
  }
}

const postComment = (comment, navigation) => {
  return dispatch => {

    const fallBackId = 1093
    const postId = navigation.getParam('postId', fallBackId)
    const param = {content: comment}

    getAxiosInstance().then(api => {
      api.post(`${API_URL}/stories/${postId}/answers`, param)
        .then(response => {
          console.log(response)
          const item = {...response.data, content: comment}
          dispatch(CommentsActions.addComment(item))
        })
        .catch(error => console.log(error))
    })
  }
}

export default {
  getComments,
  postComment
}
