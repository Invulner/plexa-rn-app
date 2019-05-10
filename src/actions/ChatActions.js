import types from '../types/chat'

const saveMessages = (data) => ({
  type: types.SAVE_MESSAGES,
  data
})

const newMessage = (data) => ({
  type: types.NEW_MESSAGE,
  data
})

const deleteMessages = () => ({
  type: types.DELETE_MESSAGES
})

const toggleMessagesLoading = (flag) => ({
  type: types.TOGGLE_MESSAGES_LOADING,
  flag
})

const updateChatPage = (page) => ({
  type: types.UPDATE_CHAT_PAGE,
  page
})

const saveMessage = (message) => ({
  type: types.SAVE_MESSAGE,
  message
})

const updateMessage = (message) => ({
  type: types.UPDATE_MESSAGE,
  message
})

export default {
  saveMessages,
  deleteMessages,
  toggleMessagesLoading,
  updateChatPage,
  saveMessage,
  updateMessage,
  newMessage
}
