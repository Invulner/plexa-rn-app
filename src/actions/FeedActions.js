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

const resetFeed = () => ({
  type: types.RESET_FEED
})

const updatePostLike = (id, data) => ({
  type: types.UPDATE_POST_LIKE,
  id,
  data
})

const updateCommentsCounter = (id, counter) => ({
  type: types.UPDATE_COMMENTS_COUNTER,
  id,
  counter
})

const savePost = (post) => ({
  type: types.SAVE_POST,
  post
})

const hidePost = (id) => ({
  type: types.HIDE_POST,
  id
})

const reportPost = (id) => ({
  type: types.REPORT_POST,
  id
})

export default {
  saveFeedData,
  toggleFeedDataLoading,
  updateFeedPage,
  refreshFeed,
  resetFeed,
  updatePostLike,
  updateCommentsCounter,
  savePost,
  hidePost,
  reportPost
}
