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
          dispatch(CommentsActions.addComment(response.data))
        })
        .catch(error => console.log(error))
    })
  }
}

const updateLike = (flag, item) => {
  return dispatch => {
    const param = {
      like: flag
    }

    return getAxiosInstance().then(api => {
      api.post(`${API_URL}/answers/${item.id}/like`, param)
        .then(response => {
          const payload = {
            ...item,
            ...response.data
          } 
          dispatch(CommentsActions.updateCommentLike(payload, item.id))})
        .catch(error => console.log('Like error: ', error))
    })
  }
}

export default {
  getComments,
  postComment,
  updateLike
}
