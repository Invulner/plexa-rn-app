import types from '../types/feed'
import utils from '../utils'

const initialState = {
  feedData: [],
  feedLoading: true
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

    case types.SAVE_POST:
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

    default:
      return state
  }
}

export default FeedReducer
