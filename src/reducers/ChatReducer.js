import types from '../types/chat'

const initialState = {
  messages: [],
  loading: true,
  page: 1,
  isLoadingMore: true
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
        page: state.page + 1
      }

    case types.TOGGLE_IS_LOADING_MORE:
      return {
        ...state,
        isLoadingMore: action.flag
      }

    default:
      return state
  }
}

export default chatReducer
