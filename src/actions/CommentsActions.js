import types from '../types/comments'

const saveCommentsData = (items) => ({
  type: types.SAVE_COMMENTS_DATA,
  items
})

const toggleCommentsLoading = (flag) => ({
  type: types.TOGGLE_COMMENTS_LOADING,
  flag
})

const resetCommentsData = () => ({
  type: types.RESET_COMMENTS_DATA
})

export default {
  saveCommentsData,
  toggleCommentsLoading,
  resetCommentsData
}
