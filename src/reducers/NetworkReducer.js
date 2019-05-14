import types from '../types/network'

const initialState = {
  isConnected: null
}

const NetworkReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_CONNECTION_STATUS:
      return {
        isConnected: action.isConnected
      }

    default:
      return state
  }
}

export default NetworkReducer
