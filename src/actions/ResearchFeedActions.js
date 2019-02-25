import types from '../types/researchFeed'

const saveResearchFeedData = (feedData) => ({
  type: types.SAVE_RESEARCH_FEED_DATA,
  feedData
})

const toggleResearchFeedLoading = (flag) => ({
  type: types.TOGGLE_RESEARCH_FEED_LOADING,
  flag
})

export default {
  saveResearchFeedData,
  toggleResearchFeedLoading
}
