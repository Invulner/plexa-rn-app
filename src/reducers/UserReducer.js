import types from '../types/user'

const initialState = {
  id: '',
  email: '',
  provider: '',
  customer_id: ''
}

const userReducer = (state = initialState, action) => {
  switch(action.type) {
    case types.SAVE_USER_DATA:
      return {...state, ...action.userData}
    default:
      return state
  }
}

export default userReducer
