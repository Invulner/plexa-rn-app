import types from '../types/otherUser'

const saveOtherUserData = (otherUserData) => ({
  type: types.SAVE_OTHER_USER_DATA,
  otherUserData
})

export default {
  saveOtherUserData
}
