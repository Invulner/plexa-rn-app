import getAxiosInstance from '../config/axios'
import FeedActions from '../actions/FeedActions'
import CommentsActions from '../actions/CommentsActions'

const fetchFeed = (saveOption, { page, silent, ...queryOptions } = {}) => {
  return dispatch => {
    !silent && dispatch(FeedActions.toggleFeedDataLoading(true))
    const currentPage = page || 1

    return getAxiosInstance().then(api => {
      api.get(`/feed`, {
        params: {
          ...queryOptions,
          page: currentPage
        }
      })
        .then(response => {
          switch (saveOption) {
            case 'add':
              dispatch(FeedActions.saveFeedData(response.data))
              break
            case 'refresh':
              dispatch(FeedActions.refreshFeed(response.data))
              break
            default:
              console.log('wrong saveOption')
              break
          }
      
          dispatch(FeedActions.updateFeedPage(currentPage))
          !silent && dispatch(FeedActions.toggleFeedDataLoading(false))
        })
        .catch(error => console.log('fetchFeed error: ', error))
    })
    .catch(error => console.log('Axios config error: ', error))
  }
}

const getFeed = (page = 1, queryOptions) => {
  return dispatch => {
    dispatch(fetchFeed('add', { page, ...queryOptions }))
  }
}

const refreshFeed = (params) => {
  return dispatch => {
    dispatch(fetchFeed('refresh', params))
  }
}

const updateLike = (flag, id) => {
  return dispatch => {
    const param = {
      like: flag
    }

    return getAxiosInstance().then(api => {
      api.post(`/stories/${id}/like`, param)
        .then(response => dispatch(FeedActions.updatePostLike(id, response.data)))
        .catch(error => console.log('LIKE ERROR: ', error))
    })
  }
}

const hidePost = (postId, cb) => {
  return dispatch => {

    return getAxiosInstance().then(api => {
      api.post(`/stories/${postId}/hide`)
        .then(response => {
          response.data.hidden && dispatch(FeedActions.hidePost(postId))
          cb()
        })
    })
  }
}

const reportPost = (postId, cb) => {
  return dispatch => {

    return getAxiosInstance().then(api => {
      api.post(`/stories/${postId}/report`)
        .then(response => {
          response.data.reported && dispatch(FeedActions.reportPost(postId))
          cb()
        })
    })
  }
}

const blockUser = (userId, cb) => {
  return dispatch => {

    return getAxiosInstance().then(api => {
      api.post(`/profiles/${userId}/block`)
        .then(response => {
          response.data.blocked && dispatch(FeedActions.blockUser(userId))
          cb()
        })
    })
  }
}

const deletePost = (postId, cb) => {
  return dispatch => {

    return getAxiosInstance().then(api => {
      api.delete(`/stories/${postId}`)
        .then(response => {
          response.data.deleted && dispatch(FeedActions.deletePost(postId))
          cb()
        })
    })
  }
}

const submitPost = (post, cb) => {
  return dispatch => {

    getAxiosInstance().then(api => {
      api.post(`/stories`, post)
      .then(res => {
        dispatch(FeedActions.saveComposedPost(res.data))
        cb()
      }).catch(error => console.log('SUBMIT POST ERROR: ', error))
    })
  }
}

const handleStoryUpdate = (data, dispatch) => {
  if (data.action === 'deleted') {
    dispatch(FeedActions.deletePost(data.id))
  } else {
    dispatch(FeedActions.updatePost({...data.attrs, id: data.id}))
  }
}

const handleAnswerUpdate = (data, dispatch) => {
  if (data.action === 'created') {
    dispatch(FeedActions.updateCommentsCounter(data.story_id))
    dispatch(CommentsActions.addComment(data.attrs))
  } else if ((data.action === 'liked') || (data.action === 'updated')) {
    dispatch(CommentsActions.updateComment(data.id, data.attrs))
  } else if (data.action === 'deleted') {
    dispatch(CommentsActions.deleteComment(data.id))
    dispatch(FeedActions.updateCommentsCounter(data.story_id, 'decrease'))
  }
}

const connectToWs = () => {
  return dispatch => {
    const feedChannel = global.cableInstance && global.cableInstance.subscriptions.create(
      {
        channel: 'FeedChannel',
        client_type: 'mobile'
      },
      {
        received: (data) => {
          if (data.type === 'story') {
            handleStoryUpdate(data, dispatch)
          } else if (data.type === 'answer') {
            handleAnswerUpdate(data, dispatch)
          }
        }
      }
    )
  }
}

const submitPostWithImage = (image, post, cb, postId) => {
  return dispatch => {
    const optionalHeaders = {
      'Content-Type': 'multipart/form-data'
    }

    return getAxiosInstance(optionalHeaders).then(api => {
      api.post(`/stories/images`, image)
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
    return getAxiosInstance().then(api => {
      api.put(`/stories/${postId}`, post)
        .then(response => {
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
  connectToWs,
  reportPost,
  blockUser,
  deletePost,
  submitPostUpdate
}
