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

export default {
  saveCommentsData,
  toggleCommentsLoading,
  resetCommentsData
}
