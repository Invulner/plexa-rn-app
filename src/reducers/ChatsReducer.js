import types from '../types/chats'

const initialState = {
  loading: true,
  users: []
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

    default:
      return state
  }
}

export default ChatsReducer
