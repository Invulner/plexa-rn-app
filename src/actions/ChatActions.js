import types from '../types/chat'

const saveMessages = (data) => ({
  type: types.SAVE_MESSAGES,
  data
})

const deleteMessages = () => ({
  type: types.DELETE_MESSAGES
})

export default {
  saveMessages,
  deleteMessages
}
