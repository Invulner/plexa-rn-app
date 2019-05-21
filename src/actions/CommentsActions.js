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

export default {
  saveCommentsData,
  editComment,
  cancelEditing,
  toggleCommentsLoading,
  resetCommentsData,
  addComment,
  updateComment
}
