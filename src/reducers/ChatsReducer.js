import types from '../types/chats'

const initialState = {}

const ChatsReducer = (state = initialState, action) => {
  switch(action.type) {
    case types.GET_CHATS:
      return {
        ...state,
        rooms: action.data
      }
    default:
      return state
  }
}

export default ChatsReducer
