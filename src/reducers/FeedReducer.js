import types from '../types/feed'
import utils from '../utils'

const initialState = {
  feedData: [],
  feedLoading: true
}

const blockUser = (state, action) => {
  const newVal = { blocked: true }
  const newFeedData = state.feedData.map(item => {
    if (item.author.id === action.id)
      return { ...item, ...newVal }
    else
      return item
  })

  return {
    ...state,
    feedData: newFeedData
  }
}

const concealPost = (state, action, option) => {
  let newVals

  switch (option) {
    case 'hide':
      newVals = { hidden: true }
      break
    case 'report':
      newVals = { reported: true }
      break
    case 'delete':
      newVals = { deleted: true }
      break
    default:
      console.log('Wrong option or no option passed')
  }
  
  const newFeedData = utils.updateItemById(state.feedData, action.id, newVals)

  return {
    ...state,
    feedData: newFeedData
  }
}

const updateCommentsCounter = (state, action) => {
  const item = utils.findItemById(state.feedData, action.id)
  const counter = isNaN(action.counter) ? item.answers_count + 1 : action.counter
  const newVal = { answers_count: counter }
  const newFeedData = utils.updateItemById(state.feedData, action.id, newVal)

  return {
    ...state,
    feedData: newFeedData
  }
}

const updatePostLike = (state, action) => {
  if (action.data) {
    const newVals = {
      liked: action.data.liked,
      likes_count: action.data.likes_count
    }
    const newFeedData = utils.updateItemById(state.feedData, action.id, newVals)

      return {
        ...state,
        feedData: newFeedData
      }
  } else {
    return state
  }
}

const updatePost = (state, action) => {
  const newFeedData = utils.updateItemById(state.feedData, action.post.id, action.post)

  return {
    ...state,
    feedData: newFeedData
  }
}

const FeedReducer = (state = initialState, action) => {
  switch(action.type) {
    case types.SAVE_FEED_DATA:
      return {
        ...state,
        feedData: [
          ...state.feedData,
          ...action.feedData
        ]
      }

    case types.TOGGLE_FEED_DATA_LOADING:
      return {
        ...state,
        feedLoading: action.flag
      }

    case types.UPDATE_FEED_PAGE:
      return {
        ...state,
        page: action.page
      }

    case types.REFRESH_FEED:
      return {
        ...state,
        feedData: action.refreshedFeedData
      }

    case types.SAVE_COMPOSED_POST:
      return {
        ...state,
        feedData: [
          action.post,
          ...state.feedData
        ]
      }

    case types.RESET_FEED:
      return initialState

    case types.UPDATE_POST_LIKE:
      return updatePostLike(state, action)

    case types.UPDATE_COMMENTS_COUNTER:
      return updateCommentsCounter(state, action)

    case types.HIDE_POST:
      return concealPost(state, action, 'hide')

    case types.REPORT_POST:
      return concealPost(state, action, 'report')

    case types.BLOCK_USER:
      return blockUser(state, action)

    case types.DELETE_POST:
      return concealPost(state, action, 'delete')

    case types.UPDATE_POST:
      return updatePost(state, action)

    default:
      return state
  }
}

export default FeedReducer
