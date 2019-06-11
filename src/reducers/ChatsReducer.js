import types from '../types/chats'

const initialState = {
  loading: true,
  page: 1,
  users: [],
  items: [],
  usersLoading: false,
  areUsersChosen: false,
  messages: {},
  messagesLoading: true,
  unread_count: null
}

const saveMessage = (state, action) => {
  const chatMessages = state.messages[action.chatId]
  
  if (!chatMessages) {
    return {
      ...state,
      messages: {
        ...state.messages,
        [action.chatId]: [action.message]
      }
    }
  }
  //check if message from web socket is your own message, and update if it is
  const message = chatMessages.find(message => message.seq_id === action.message.seq_id)

  if (action.message.seq_id && message) {
    const messageIndex = chatMessages.findIndex(item => item.seq_id === message.seq_id)

    return {
      ...state,
      messages: {
        ...state.messages,
        [action.chatId]: [
          ...chatMessages.slice(0, messageIndex),
          action.message,
          ...chatMessages.slice(messageIndex + 1)
        ]
      }
    }
  }

  return {
    ...state,
    messages: {
      ...state.messages,
      [action.chatId]: [action.message, ...chatMessages]
    }
  }
}

const saveMessages = (state, action) => {
  const { messages } = state

  if (!messages[action.chatId] || messages[action.chatId] && action.page === 1) {
    return {
      ...state,
      page: action.page,
      messages: {
        ...messages,
        [action.chatId]: action.data
      }
    }
  } else if (messages) {
    return {
      ...state,
      page: action.page,
      messages: {
        ...messages,
        [action.chatId]: [...messages[action.chatId], ...action.data]
      }
    }
  }
}

const updateChat = (state, action) => {
  const index = state.items.findIndex(item => item.id === action.data.room_id)
  const updatedChat = {
    ...state.items[index], 
    last_message: {...state.items[index]['last_message'], ...action.data},
    last_message_date: action.data.created_at || state.items[index]['last_message_date']
  }
  if (action.data.increase_count) {
    updatedChat.unread_count = updatedChat.unread_count + 1
  }
  if (action.data.reset_count) {
    updatedChat.unread_count = 0
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

    case types.TOGGLE_USERS_LOADING:
      return {
        ...state,
        usersLoading: action.flag
      }

    case types.TOGGLE_CHOSEN_USERS_FLAG:
      return {
        ...state,
        areUsersChosen: action.flag
      }

    case types.SAVE_MESSAGES:
      return saveMessages(state, action)

    case types.TOGGLE_MESSAGES_LOADING:
      return {
        ...state,
        messagesLoading: action.flag
      }

    case types.SAVE_MESSAGE:
      return saveMessage(state, action)

    case types.UPDATE_UNREAD_COUNT:
      return {
        ...state,
        unread_count: action.data
      }

    default:
      return state
  }
}

export default ChatsReducer
