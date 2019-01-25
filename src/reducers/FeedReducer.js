import types from '../types/feed'

const initialState = {
  feedData: [],
  feedLoading: true
}

const feedReducer = (state = initialState, action) => {
  switch(action.type) {
    case types.SAVE_FEED_DATA:
      return {...state, feedData: [...state.feedData, ...action.feedData]}
    case types.TOGGLE_FEED_DATA_LOADING:
      return {...state, feedLoading: action.flag}
    case types.UPDATE_FEED_PAGE:
      return {...state, page: action.page}
    case types.REFRESH_FEED:
      return {...state, feedData: action.refreshedFeedData}
    default:
      return state
  }
}

export default feedReducer
