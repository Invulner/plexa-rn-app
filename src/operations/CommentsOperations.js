import getAxiosInstance from '../config/axios'
import { API_URL } from '../constants'
import CommentsActions from '../actions/CommentsActions'
import FeedActions from '../actions/FeedActions'

const getComments = (navigation) => {
  return dispatch => {
    dispatch(CommentsActions.toggleCommentsLoading(true))

    return getAxiosInstance().then(api => {
      const fallBackId = 1093
      const postId = navigation.getParam('postId', fallBackId)

      api.get(`${API_URL}/stories/${postId}/answers`)
        .then(response => {
          dispatch(CommentsActions.saveCommentsData(response.data))
          dispatch(CommentsActions.toggleCommentsLoading(false))
          dispatch(FeedActions.updateCommentsCounter(postId, response.data.answers.length))
        }).catch(error => console.log('Request error: ', error))
    }).catch(error => console.log('Axios config error: ', error))
  }
}

const postComment = (comment, navigation) => {
  return dispatch => {

    const fallBackId = 1093
    const postId = navigation.getParam('postId', fallBackId)
    const param = { content: comment }

    getAxiosInstance().then(api => {
      api.post(`${API_URL}/stories/${postId}/answers`, param)
        .then(response => {
          console.log(response.data)
          dispatch(CommentsActions.addComment(response.data))
          dispatch(FeedActions.updateCommentsCounter(postId))
        })
        .catch(error => console.log(error))
    })
  }
}

const updateLike = (flag, id) => {
  return dispatch => {
    const param = {
      like: flag
    }

    return getAxiosInstance().then(api => {
      api.post(`${API_URL}/answers/${id}/like`, param)
        .then(response => dispatch(CommentsActions.updateCommentLike(id, response.data)))
        .catch(error => console.log('Like error: ', error))
    })
  }
}

export default {
  getComments,
  postComment,
  updateLike
}
