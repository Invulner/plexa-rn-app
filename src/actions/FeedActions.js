import types from '../types/feed'

const saveFeedData = (feedData) => ({
  type: types.SAVE_FEED_DATA,
  feedData
})

const toggleFeedDataLoading = (flag) => ({
  type: types.TOGGLE_FEED_DATA_LOADING,
  flag
})

const updateFeedPage = (page) => ({
  type: types.UPDATE_FEED_PAGE,
  page
})

const refreshFeed = (refreshedFeedData) => ({
  type: types.REFRESH_FEED,
  refreshedFeedData
})

export default {
  saveFeedData,
  toggleFeedDataLoading,
  updateFeedPage,
  refreshFeed
}
