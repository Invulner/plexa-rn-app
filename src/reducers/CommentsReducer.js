import types from '../types/comments'

const initialState = {
  items: [],
  loading: true,
  enabled: false
}

const CommentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SAVE_COMMENTS_DATA:
      return {...state, items: action.data.answers, enabled: action.data.comments_enabled}
    case types.TOGGLE_COMMENTS_LOADING:
      return {...state, loading: action.flag}
    case types.RESET_COMMENTS_DATA:
      return initialState
    case types.ADD_COMMENT:
      return {...state, items: [...state.items, action.item]}
    default: 
      return state
  }
}

export default CommentsReducer
