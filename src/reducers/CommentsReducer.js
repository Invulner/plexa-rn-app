import types from '../types/comments'
import utils from '../utils'

const initialState = {
  items: [],
  loading: true,
  enabled: false
}

const updateCommentLike = (state, action) => {
  const item = utils.findItemById(state.items, action.id)
  const { liked, likes_count } = item
  const newVals = {
    liked: !liked,
    likes_count: liked ? likes_count - 1 : likes_count + 1
  }
  const newItems = utils.updateItemById(state.items, action.id, newVals)

  return {
    ...state,
    items: newItems
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
