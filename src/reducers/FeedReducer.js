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
    case types.UPDATE_POST_LIKE:
      const updateLikeIndex = state.feedData.findIndex(item => item.id === action.id)
      
      return {
        ...state,
        feedData: [
          ...state.feedData.slice(0, updateLikeIndex),
          {
            ...state.feedData[updateLikeIndex],
            liked: !state.feedData[updateLikeIndex].liked,
            likes_count: state.feedData[updateLikeIndex].liked ? state.feedData[updateLikeIndex].likes_count - 1 : state.feedData[updateLikeIndex].likes_count + 1
          },
          ...state.feedData.slice(updateLikeIndex + 1)
        ]
      }
    case types.UPDATE_COMMENTS_COUNTER:
    const updateCommentsIndex = state.feedData.findIndex(item => item.id === action.id)

    return {
      ...state,
      feedData: [
      ...state.feedData.slice(0, updateCommentsIndex),
      {
        ...state.feedData[updateCommentsIndex],
        answers_count: state.feedData[updateCommentsIndex].answers_count + 1
      },
      ...state.feedData.slice(updateCommentsIndex + 1)
      ]
    }
    default:
      return state
  }
}

export default FeedReducer
