import types from '../types/researchFeed'

const initialState = {
  feedData: [],
  loading: true,
  page: 1
}

const ResearchFeedReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SAVE_RESEARCH_FEED_DATA:
      return {
        ...state, 
        feedData: [
          ...state.feedData, 
          ...action.feedData
        ]
      }
    case types.TOGGLE_RESEARCH_FEED_LOADING:
      return {
        ...state, 
        loading: action.flag
      }
    case types.UPDATE_RESEARCH_FEED_PAGE:
      return {
        ...state, 
        page: action.page
      }
    case types.REFRESH_RESEARCH_FEED:
      return {
        ...state, 
        feedData: action.feedData
      }
    default:
      return state
  }
}

export default ResearchFeedReducer
