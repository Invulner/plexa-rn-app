import types from '../types/researchFeed'

const initialState = {
  feedData: [],
  loading: true
}

const ResearchFeedReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SAVE_RESEARCH_FEED_DATA:
      return {...state, feedData: action.feedData}
    case types.TOGGLE_RESEARCH_FEED_LOADING:
      return {...state, loading: action.flag}
    default:
      return state
  }
}

export default ResearchFeedReducer
