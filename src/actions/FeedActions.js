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

const toggleNextPageLoading = (flag) => ({
  type: types.TOGGLE_NEXT_PAGE_LOADING,
  flag
})

export default {
  saveFeedData,
  toggleFeedDataLoading,
  updateFeedPage,
  toggleNextPageLoading
}
