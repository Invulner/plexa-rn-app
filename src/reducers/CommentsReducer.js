import types from '../types/comments'

const initialState = {
  items: [],
  loading: true,
  areCommentsEnabled: false
}

const CommentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SAVE_COMMENTS_DATA:
      return {...state, items: action.data.answers, areCommentsEnabled: action.data.comments_enabled}
    case types.TOGGLE_COMMENTS_LOADING:
      return {...state, loading: action.flag}
    case types.RESET_COMMENTS_DATA:
      return initialState
    default: 
      return state
  }
}

export default CommentsReducer
