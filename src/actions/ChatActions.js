import types from '../types/chat'

const saveMessages = (data) => ({
  type: types.SAVE_MESSAGES,
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
export default {
  saveMessages,
  deleteMessages,
  toggleMessagesLoading,
  updateChatPage
}
