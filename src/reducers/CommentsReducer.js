import types from '../types/comments'
import utils from '../utils'

const initialState = {
  items: [],
  loading: true,
  enabled: false
}

const updateCommentLike = (state, action) => {
  if (action.data) {
    const newVals = {
      liked: action.data.liked,
      likes_count: action.data.likes_count
    }
    const newItems = utils.updateItemById(state.items, action.id, newVals)

      return {
        ...state,
        items: newItems
      }
  } else {
    return state
  }
}

const CommentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SAVE_COMMENTS_DATA:
      return {
        ...state,
        items: action.data.answers,
        enabled: action.data.comments_enabled
      }

    case types.TOGGLE_COMMENTS_LOADING:
      return {
        ...state,
        loading: action.flag
      }

    case types.RESET_COMMENTS_DATA:
      return initialState

    case types.ADD_COMMENT:
      return {
        ...state,
        items: [
          ...state.items,
          action.item
        ]
      }

    case types.UPDATE_COMMENT_LIKE:
      return updateCommentLike(state, action)
    default:
      return state
  }
}

export default CommentsReducer
