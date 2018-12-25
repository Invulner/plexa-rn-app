import types from '../types/user'

const initialState = {
  id: '',
  email: '',
  provider: '',
  customer_id: '',
  loading: false
}

const userReducer = (state = initialState, action) => {
  switch(action.type) {
    case types.SAVE_USER_DATA:
      return {...state, ...action.userData}
    case types.TOGGLE_USER_DATA_LOADING:
      return {...state, loading: action.flag}
    default:
      return state
  }
}

export default userReducer
