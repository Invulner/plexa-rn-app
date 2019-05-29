import types from '../types/network'

const initialState = {
  isConnected: null,
  isCableConnected: null
}

const NetworkReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_CONNECTION_STATUS:
      return {
        ...state,
        isConnected: action.isConnected
      }

    case types.UPDATE_CABLE_CONNECTION_STATUS:
      return {
        ...state,
        isCableConnected: action.isConnected
      }

    default:
      return state
  }
}

export default NetworkReducer
