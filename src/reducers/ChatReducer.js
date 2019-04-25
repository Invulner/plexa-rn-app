import types from '../types/chat'

const initialState = {
  messages: [],
  loading: true
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

    case types.TOGGLE_MESSAGES_LOADING:
      return {
        ...state,
        loading: action.flag
      }

    default:
      return state
  }
}

export default chatReducer
