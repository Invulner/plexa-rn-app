import types from '../types/user'

const successAuth = (userData) => ({
  type: types.SUCCESS_AUTH,
  userData
})

export default {
  successAuth
}
