import types from '../types/chats'

const initialState = {
  loading: true,
  users: [],
  items: []
}

const updateChat = (state, action) => {
  const index = state.items.findIndex(item => item.id === action.data.room_id)
  const updatedChat = {
    ...state.items[index], 
    last_message: action.data, 
    last_message_date: action.data.created_at
  }
  const items = [
    ...state.items.slice(0, index),
    updatedChat,
    ...state.items.slice(index + 1)
  ]

  return {
    ...state,
    items
  }
}

const ChatsReducer = (state = initialState, action) => {
  switch(action.type) {
    case types.GET_CHATS:
      return {
        ...state,
        items: action.data
      }

    case types.TOGGLE_CHATS_LOADING:
      return {
        ...state,
        loading: action.flag
      }

    case types.GET_USERS:
      return {
        ...state,
        users: action.data
      }

    case types.DELETE_USERS: 
      return {
        ...state,
        users: initialState.users
      }

    case types.CREATE_CHAT:
      return {
        ...state,
        items: [action.data, ...state.items]
      }

    case types.RESET_CHATS:
      return initialState

	  case types.UPDATE_CHAT:
      return updateChat(state, action)
      
    case types.SAVE_CHOSEN_USERS:
      return {
        ...state,
        chosenUsers: action.chosenUsers
      }

    default:
      return state
  }
}

export default ChatsReducer
