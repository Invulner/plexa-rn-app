import types from '../types/feed'

const initialState = {
  feedData: [],
  feedLoading: true
}

const FeedReducer = (state = initialState, action) => {
  switch(action.type) {
    case types.SAVE_FEED_DATA:
      return {
        ...state, 
        feedData: [
          ...state.feedData, 
          ...action.feedData
        ]
      }
    case types.TOGGLE_FEED_DATA_LOADING:
      return {
        ...state, 
        feedLoading: action.flag
      }
    case types.UPDATE_FEED_PAGE:
      return {
        ...state, 
        page: action.page
      }
    case types.REFRESH_FEED:
      return {
        ...state, 
        feedData: action.refreshedFeedData
      }
    case types.RESET_FEED: 
      return initialState
    case types.UPDATE_COMMENTS_COUNTER:
      const index1 = state.feedData.findIndex(item => item.id === action.item.id)

      return {
        ...state,
        feedData: [
          ...state.feedData.slice(0, index1),
          action.item,
          ...state.feedData.slice(index1 + 1)
        ]
      }
    case types.UPDATE_POST_LIKE:
      const index2 = state.feedData.findIndex(item => item.id === action.item.id)
      
      return {
        ...state,
        feedData: [
          ...state.feedData.slice(0, index2),
          action.item,
          ...state.feedData.slice(index2 + 1)
        ]
      }
    default:
      return state
  }
}

export default FeedReducer
