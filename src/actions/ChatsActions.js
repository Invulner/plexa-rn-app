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

const deleteUsers = () => ({
  type: types.DELETE_USERS
})

const createChat = (data) => ({
  type: types.CREATE_CHAT,
  data
})

const updateChat = (data) => ({
  type: types.UPDATE_CHAT,
  data
})

const resetChats = () => ({
  type: types.RESET_CHATS
})

const saveChosenUsers = (chosenUsers) => ({
  type: types.SAVE_CHOSEN_USERS,
  chosenUsers
})

export default {
  getChats,
  toggleLoading,
  getUsers,
  deleteUsers,
  createChat,
  resetChats,
  updateChat,
  saveChosenUsers
}
