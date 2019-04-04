import types from '../types/publicUser'

const initialState = {
  loading: true
}

const PublicUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SAVE_PUBLIC_USER_DATA:
      return {
        ...state,
        ...action.publicUserData
      }

    case types.CLEAR_PUBLIC_USER_DATA:
      return initialState

    case types.TOGGLE_PUBLIC_USER_LOADING:
      return {
        ...state,
        loading: action.flag
      }

    default:
    return state
  }
}

export default PublicUserReducer
