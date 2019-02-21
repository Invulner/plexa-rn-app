import types from '../types/comments'

const saveCommentsData = (commentsData) => ({
  type: types.SAVE_COMMENTS_DATA,
  commentsData
})

const toggleCommentsLoading = (flag) => ({
  type: types.TOGGLE_COMMENTS_LOADING,
  flag
})

export default {
  saveCommentsData,
  toggleCommentsLoading
}
