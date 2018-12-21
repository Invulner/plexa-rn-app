import types from '../types/user'
import UserActions from '../actions/UserActions';

const initialState = {
  id: '',
  email: '',
  provider: '',
  customer_id: ''
}

const userReducer = (state = initialState, action) => {
  switch(action.type) {
    case types.SUCCESS_AUTH:
      return {...state, ...action.userData}
    default:
      return state
  }
}

export default userReducer
