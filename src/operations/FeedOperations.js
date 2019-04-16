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

const submitPost = (post, cb) => {
  return dispatch => {

    getAxiosInstance().then(api => {
      api.post(`${API_URL}/stories`, post)
      .then(res => {
        console.log(res.data)
        dispatch(FeedActions.savePost(res.data))
        cb()
      }).catch(error => console.log('SUBMIT POST ERROR: ', error))
    })
  }
}

const submitPostWithImage = (image, post, cb) => {
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
          dispatch(submitPost(newPost, cb))
        }).catch(error => console.log('SUBMIT IMAGE ERROR: ', error))
    })
  }
}

const hidePost = (postId) => {
  return dispatch => {

    return getAxiosInstance().then(api => {
      api.post(`${API_URL}/stories/${postId}/hide`)
        .then(response => {
          console.log(response.data)
          response.data.hidden && dispatch(FeedActions.hidePost(postId))
        })
    })
  }
}

const reportPost = (postId) => {
  return dispatch => {

    return getAxiosInstance().then(api => {
      api.post(`${API_URL}/stories/${postId}/report`)
        .then(response => {
          console.log(response.data)
          response.data.reported && dispatch(FeedActions.reportPost(postId))
        })
    })
  }
}

const blockUser = (userId) => {
  return dispatch => { 

    return getAxiosInstance().then(api => {
      api.post(`${API_URL}/profiles/${userId}/block`)
        .then(response => {
          console.log(response.data)
          response.data.blocked && dispatch(FeedActions.blockUser(userId))
        })
    })
  }
}

const deletePost = (postId) => {
  return dispatch => {
    
    return getAxiosInstance().then(api => {
      api.delete(`${API_URL}/stories/${postId}`)
        .then(response => {
          console.log(response)
          response.data.deleted && dispatch(FeedActions.deletePost(postId))
        })
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
        })
    })
  }
}

const submitPostUpdateWithImage = (image, postId, post, cb) => {
  console.log('submitPostUpdateWithImage starts')
  return dispatch => {
    const optionalHeaders = {
      'Content-Type': 'multipart/form-data'
    }

    return getAxiosInstance(optionalHeaders).then(api => {
      api.post(`${API_URL}/stories/images`, image)
        .then(response => {
          console.log(response.data)
          const newPost = {
            ...post,
            image_ids: [
              response.data.id
            ]
          }
          console.log('New post with fresh image', newPost)
          dispatch(submitPostUpdate(postId, newPost, cb))
        }).catch(error => console.log('SUBMIT POST UPDATE WITH IMAGE ERROR: ', error))
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
  submitPostUpdate,
  submitPostUpdateWithImage
}
