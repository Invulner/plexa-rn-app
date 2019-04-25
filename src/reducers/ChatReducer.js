import types from '../types/chat'

const initialState = {
  messages: []
}

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SAVE_MESSAGES:
      return {
        ...state,
        messages: action.data
      }

    case types.DELETE_MESSAGES:
      return {
        ...state,
        messages: initialState.messages
      }

    default:
      return state
  }
}

export default chatReducer
