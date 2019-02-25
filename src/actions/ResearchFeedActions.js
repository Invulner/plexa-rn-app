import types from '../types/researchFeed'

const saveResearchFeedData = (feedData) => ({
  type: types.SAVE_RESEARCH_FEED_DATA,
  feedData
})

const toggleResearchFeedLoading = (flag) => ({
  type: types.TOGGLE_RESEARCH_FEED_LOADING,
  flag
})

const updateResearchFeedPage = (page) => ({
  type: types.UPDATE_RESEARCH_FEED_PAGE,
  page
})

export default {
  saveResearchFeedData,
  toggleResearchFeedLoading,
  updateResearchFeedPage
}
