import types from '../types/feed'

const initialState = {}

const feedReducer = (state = initialState, action) => {
  switch(action.type) {
    case types.SAVE_FEED_DATA:
      return {...state, feedData: action.feedData}
    case types.TOGGLE_FEED_DATA_LOADING:
      return {...state, feedLoading: action.flag}
    default:
      return state
  }
}

export default feedReducer
