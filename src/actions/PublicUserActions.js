import types from '../types/publicUser'

const savePublicUserData = (publicUserData) => ({
  type: types.SAVE_PUBLIC_USER_DATA,
  publicUserData
})

const clearPublicUserData = () => ({
  type: types.CLEAR_PUBLIC_USER_DATA
})

const togglePublicUserLoading = (flag) => ({
  type: types.TOGGLE_PUBLIC_USER_LOADING,
  flag
})

export default {
  savePublicUserData,
  clearPublicUserData,
  togglePublicUserLoading
}
