import types from '../types/comments'
import utils from '../utils'

const initialState = {
  items: [],
  loading: true,
  enabled: false,
  editable: null,
  deleted: false,
  post_id: null
}

const updateComment = (state, action) => {
  if (action.data) {
    const newItems = utils.updateItemById(state.items, action.id, action.data)

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
          ...state.items.filter(comment => !comment.updating),
          action.item
        ]
      }

    case types.UPDATE_COMMENT:
      return updateComment(state, action)

    case types.EDIT_COMMENT:
      return {
        ...state,
        editable: utils.findItemById(state.items, action.id)
      }

    case types.CANCEL_EDITING:
      return {
        ...state,
        editable: null
      }

    case types.DELETE_COMMENT:
      return updateComment(state, action)

    default:
      return state
  }
}

export default CommentsReducer
