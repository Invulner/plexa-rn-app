import types from '../types/otherUser'

const initialState = {}

const otherUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SAVE_OTHER_USER_DATA:
      return {...state, ...action.otherUserData}
    default: 
    return state
  }
}

export default otherUserReducer
