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

const updateComment = (id, data) => ({
  type: types.UPDATE_COMMENT,
  id,
  data
})

const editComment = (id) => ({
  type: types.EDIT_COMMENT,
  id
})

const cancelEditing = () => ({
  type: types.CANCEL_EDITING
})

const deleteComment = (id, post_id) => ({
  type: types.DELETE_COMMENT,
  id,
  data: {
    deleted: true
  },
  post_id
})

export default {
  saveCommentsData,
  editComment,
  deleteComment,
  cancelEditing,
  toggleCommentsLoading,
  resetCommentsData,
  addComment,
  updateComment
}
