import types from '../types/user'

const saveUserData = (userData) => ({
  type: types.SAVE_USER_DATA,
  userData
})

const toggleUserDataLoading = (flag) => ({
  type: types.TOGGLE_USER_DATA_LOADING,
  flag
})

const clearUserData = () => ({
  type: types.CLEAR_USER_DATA
})

export default {
  saveUserData,
  toggleUserDataLoading,
  clearUserData
}
