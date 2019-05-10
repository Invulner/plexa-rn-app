import types from '../types/chat'

const initialState = {
  messages: [],
  loading: true
}

const updateMessage = (state, action) => {
  const index = state.messages.findIndex(item => item.text === action.message.text)
  const messages = [
    ...state.messages.slice(0, index),
    action.message,
    ...state.messages.slice(index + 1)
  ]

  return {
    ...state,
    messages
  }
}

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SAVE_MESSAGES:
      return {
        ...state,
        messages: [
          ...state.messages,
          ...action.data
        ]
      }

	  case types.NEW_MESSAGE:
	    if (state.messages.find(message => message.seq_id === action.data.seq_id)) return state
		  return {
			  ...state,
			  messages: [
				  action.data,
				  ...state.messages
			  ]
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

    case types.UPDATE_CHAT_PAGE:
      return {
        ...state,
        page: action.page
      }

    case types.SAVE_MESSAGE:
      return {
        ...state,
        messages: [action.message, ...state.messages]
      }

    case types.UPDATE_MESSAGE:
      return updateMessage(state, action)

    default:
      return state
  }
}

export default chatReducer
