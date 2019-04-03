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

const refreshResearchFeed = (feedData) => ({
  type: types.REFRESH_RESEARCH_FEED,
  feedData
})

const resetResearchFeed = () => ({
  type: types.RESET_RESEARCH_FEED
})

export default {
  saveResearchFeedData,
  toggleResearchFeedLoading,
  updateResearchFeedPage,
  refreshResearchFeed,
  resetResearchFeed
}
