import types from '../types/user'

const initialState = {
  user: {}
}

const userReducer = (state = initialState, action) => {
  switch(action.type) {
    case types.SUCCESS_AUTH:
      return {
        ...state, 
        user: [...action.userData]
      }
    default:
      return state
  }
}

export default userReducer
