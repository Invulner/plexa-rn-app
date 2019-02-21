import types from '../types/comments'

const initialState = {
  commentsData: [],
  loading: true
}

const CommentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SAVE_COMMENTS_DATA:
      return {...state, commentsData: action.commentsData}
    case types.TOGGLE_COMMENTS_LOADING:
      return {...state, loading: action.flag}
    default: 
      return state
  }
}

export default CommentsReducer
