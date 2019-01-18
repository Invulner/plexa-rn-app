import types from '../types/user'

const initialState = {}

const userReducer = (state = initialState, action) => {
  switch(action.type) {
    case types.SAVE_USER_DATA:
      return {...state, ...action.userData}
    case types.TOGGLE_USER_DATA_LOADING:
      return {...state, loading: action.flag}
    case types.SAVE_FEED_DATA:
      return {...state, feed: action.feedData}
    case types.TOGGLE_FEED_DATA_LOADING:
      return {...state, feedLoading: action.flag}
    default:
      return state
  }
}

export default userReducer
