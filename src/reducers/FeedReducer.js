import types from '../types/feed'

const initialState = {
  feedData: [],
  nextPageLoading: false
}

const feedReducer = (state = initialState, action) => {
  switch(action.type) {
    case types.SAVE_FEED_DATA:
      return {...state, feedData: [...state.feedData, ...action.feedData]}
    case types.TOGGLE_FEED_DATA_LOADING:
      return {...state, feedLoading: action.flag}
    case types.UPDATE_FEED_PAGE:
      return {...state, page: action.page + 1}
    case types.TOGGLE_NEXT_PAGE_LOADING: 
      return {...state, nextPageLoading: action.flag}
    default:
      return state
  }
}

export default feedReducer
