import types from '../types/chats'

const getChats = (data) => ({
  type: types.GET_CHATS,
  data
})

export default {
  getChats
}
