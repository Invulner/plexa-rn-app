import types from '../types/user'

const saveUserData = (userData) => ({
  type: types.SAVE_USER_DATA,
  userData
})

export default {
  saveUserData
}
