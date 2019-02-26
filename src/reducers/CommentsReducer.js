import types from '../types/comments'

const initialState = {
  items: [],
  loading: true
}

const CommentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SAVE_COMMENTS_DATA:
      return {...state, items: action.items}
    case types.TOGGLE_COMMENTS_LOADING:
      return {...state, loading: action.flag}
    case types.RESET_COMMENTS_DATA:
      return initialState
    default: 
      return state
  }
}

export default CommentsReducer
