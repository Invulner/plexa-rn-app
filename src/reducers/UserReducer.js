import types from '../types/user'

const initialState = {
  loading: null
}

const UserReducer = (state = initialState, action) => {
  switch(action.type) {
    case types.SAVE_USER_DATA:
      return {
        ...state,
        ...action.userData
      }

    case types.TOGGLE_USER_DATA_LOADING:
      return {
        ...state,
        loading: action.flag
      }

    case types.CLEAR_USER_DATA:
      return initialState

    default:
      return state
  }
}

export default UserReducer
