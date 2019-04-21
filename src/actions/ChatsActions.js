import types from '../types/chats'

const getChats = (data) => ({
  type: types.GET_CHATS,
  data
})

const toggleLoading = (flag) => ({
  type: types.TOGGLE_CHATS_LOADING,
  flag
})

const getUsers = (data) => ({
  type: types.GET_USERS,
  data
})

export default {
  getChats,
  toggleLoading,
  getUsers
}
