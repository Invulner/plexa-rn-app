import types from '../types/network'

const updateConnectionStatus = (isConnected) => ({
  type: types.UPDATE_CONNECTION_STATUS,
  isConnected
})

export default {
  updateConnectionStatus
}
