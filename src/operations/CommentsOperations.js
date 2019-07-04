import getAxiosInstance from '../config/axios'
import CommentsActions from '../actions/CommentsActions'
import FeedActions from '../actions/FeedActions'

const getComments = (navigation) => {
  return dispatch => {
    dispatch(CommentsActions.toggleCommentsLoading(true))

    return getAxiosInstance().then(api => {
      const postId = navigation.getParam('postId')

      api.get(`/stories/${postId}/answers`)
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
    const postId = navigation.getParam('postId')
    dispatch(CommentsActions.addComment(comment))

    getAxiosInstance().then(api => {
      api.post(`/stories/${postId}/answers`, {content: comment.content})
        .then(response => {
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
      api.post(`/answers/${id}/like`, param)
        .then(response => dispatch(CommentsActions.updateComment(id, response.data)))
        .catch(error => console.log('Like error: ', error))
    })
  }
}

const editComment = (id) => {
  return dispatch => {
    dispatch(CommentsActions.editComment(id))
  }
}

const updateComment = (comment) => {
  return dispatch => {
    getAxiosInstance().then(api => {
      api.put(`/answers/${comment.id}`, {content: comment.content})
      .then(response => {
        dispatch(CommentsActions.updateComment(response.data.id, {content: response.data.content}))
        dispatch(CommentsActions.cancelEditing())
      })
      .catch(error => console.log(error))
    })
  }
}

const deleteComment = (id, post_id) => {
  return dispatch => {
    getAxiosInstance().then(api => {
      api.delete(`/answers/${id}`)
      .then(() => {
        dispatch(CommentsActions.deleteComment(id))
        dispatch(FeedActions.updateCommentsCounter(post_id, 'decrease'))
      })
      .catch(error => console.log(error))
    })
  }
}

export default {
  getComments,
  postComment,
  deleteComment,
  editComment,
  updateComment,
  updateLike
}
