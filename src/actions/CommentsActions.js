import types from '../types/comments'

const saveCommentsData = (data) => ({
  type: types.SAVE_COMMENTS_DATA,
  data
})

const toggleCommentsLoading = (flag) => ({
  type: types.TOGGLE_COMMENTS_LOADING,
  flag
})

const resetCommentsData = () => ({
  type: types.RESET_COMMENTS_DATA
})

const addComment = (item) => ({
  type: types.ADD_COMMENT,
  item
})

const updateCommentLike = (item) => ({
  type: types.UPDATE_COMMENT_LIKE,
  item
})

export default {
  saveCommentsData,
  toggleCommentsLoading,
  resetCommentsData,
  addComment,
  updateCommentLike
}
