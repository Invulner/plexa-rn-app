import types from '../types/chat'

const saveMessages = (data) => ({
  type: types.SAVE_MESSAGES,
  data
})

export default {
  saveMessages
}
