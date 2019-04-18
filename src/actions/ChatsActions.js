import types from '../types/chats'

const getChats = (data) => ({
  type: types.GET_CHATS,
  data
})

const toggleLoading = (flag) => ({
  type: types.TOGGLE_CHATS_LOADING,
  flag
})

export default {
  getChats,
  toggleLoading
}
