import getAxiosInstance from '../config/axios'
import { API_URL } from '../constants'
import FeedActions from '../actions/FeedActions'

const fetchFeed = (saveOption, page = 1) => {
  return dispatch => {
    dispatch(FeedActions.toggleFeedDataLoading(true))

    return getAxiosInstance().then(api => {
      api.get(`${API_URL}/feed?page=${page}`)
        .then(response => {

          switch (saveOption) {
            case 'add':
              dispatch(FeedActions.saveFeedData(response.data))
              console.log('add to feed')
              break
            case 'refresh':
              dispatch(FeedActions.refreshFeed(response.data))
              console.log('refresh feed')
              break
            default:
              console.log('wrong saveOption')
              break
          }

          dispatch(FeedActions.updateFeedPage(page))
          console.log(response.data)
          dispatch(FeedActions.toggleFeedDataLoading(false))
        })
        .catch(error => console.log('Request error: ', error))
    })
    .catch(error => console.log('Axios config error: ', error))
  }
}

const getFeed = (page = 1) => {
  return dispatch => {
    dispatch(fetchFeed('add', page))
  }
}

const refreshFeed = () => {
  return dispatch => {
    dispatch(fetchFeed('refresh'))
  }
}

const updateLike = (flag, id) => {
  return dispatch => {
    const param = {
      like: flag
    }

    return getAxiosInstance().then(api => {
      api.post(`${API_URL}/stories/${id}/like`, param)
        .then(response => dispatch(FeedActions.updatePostLike(id, response.data)))
        .catch(error => console.log('LIKE ERROR: ', error))
    })
  }
}

const hidePost = (postId, cb) => {
  return dispatch => {

    return getAxiosInstance().then(api => {
      api.post(`${API_URL}/stories/${postId}/hide`)
        .then(response => {
          console.log(response.data)
          response.data.hidden && dispatch(FeedActions.hidePost(postId))
          cb()
        })
    })
  }
}

const reportPost = (postId, cb) => {
  return dispatch => {

    return getAxiosInstance().then(api => {
      api.post(`${API_URL}/stories/${postId}/report`)
        .then(response => {
          console.log(response.data)
          response.data.reported && dispatch(FeedActions.reportPost(postId))
          cb()
        })
    })
  }
}

const blockUser = (userId, cb) => {
  return dispatch => { 

    return getAxiosInstance().then(api => {
      api.post(`${API_URL}/profiles/${userId}/block`)
        .then(response => {
          console.log(response.data)
          response.data.blocked && dispatch(FeedActions.blockUser(userId))
          cb()
        })
    })
  }
}

const deletePost = (postId, cb) => {
  return dispatch => {
    
    return getAxiosInstance().then(api => {
      api.delete(`${API_URL}/stories/${postId}`)
        .then(response => {
          console.log(response)
          response.data.deleted && dispatch(FeedActions.deletePost(postId))
          cb()
        })
    })
  }
}

const submitPost = (post, cb) => {
  return dispatch => {

    getAxiosInstance().then(api => {
      api.post(`${API_URL}/stories`, post)
      .then(res => {
        console.log(res.data)
        dispatch(FeedActions.saveComposedPost(res.data))
        cb()
      }).catch(error => console.log('SUBMIT POST ERROR: ', error))
    })
  }
}

const submitPostWithImage = (image, post, cb, postId) => {
  return dispatch => {
    const optionalHeaders = {
      'Content-Type': 'multipart/form-data'
    }

    return getAxiosInstance(optionalHeaders).then(api => {
      api.post(`${API_URL}/stories/images`, image)
        .then(response => {
          const newPost = {
            ...post,
            image_ids: [
              response.data.id
            ]
          }
          postId ? dispatch(submitPostUpdate(postId, newPost, cb)) : dispatch(submitPost(newPost, cb))
        }).catch(error => console.log('SUBMIT IMAGE ERROR: ', error))
    })
  }
}

const submitPostUpdate = (postId, post, cb) => {
  return dispatch => {
    console.log('Feed operations: submitPostUpdate  ', post)
    return getAxiosInstance().then(api => {
      api.put(`${API_URL}/stories/${postId}`, post)
        .then(response => {
          console.log(response.data)
          dispatch(FeedActions.updatePost(response.data))
          cb()
        }).catch(error => console.log('SUBMIT POST UPDATE ERROR: ', error))
    })
  }
}

export default {
  getFeed,
  refreshFeed,
  updateLike,
  submitPost,
  submitPostWithImage,
  hidePost,
  reportPost,
  blockUser,
  deletePost,
  submitPostUpdate
}
