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

const toggleUsersLoading = (flag) => ({
  type: types.TOGGLE_USERS_LOADING,
  flag
})

const toggleChosenUsersFlag = (flag) => ({
  type: types.TOGGLE_CHOSEN_USERS_FLAG,
  flag
})

const saveMessages = (data, chatId, page) => ({
  type: types.SAVE_MESSAGES,
  data,
  chatId,
  page
})

const updateMessage = (message, chatId) => ({
  type: types.UPDATE_MESSAGE,
  message,
  chatId
})

const saveMessage = (message, chatId) => ({
  type: types.SAVE_MESSAGE,
  message,
  chatId
})

const toggleMessagesLoading = (flag) => ({
  type: types.TOGGLE_MESSAGES_LOADING,
  flag
})

const updateUnreadCount = (data) => ({
  type: types.UPDATE_UNREAD_COUNT,
  data
})

export default {
  getChats,
  toggleLoading,
  getUsers,
  deleteUsers,
  createChat,
  updateUnreadCount,
  resetChats,
  updateChat,
  saveChosenUsers,
  toggleUsersLoading,
  toggleChosenUsersFlag,
  saveMessages,
  updateMessage,
  saveMessage,
  toggleMessagesLoading
}
