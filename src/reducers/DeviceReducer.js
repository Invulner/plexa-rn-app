import types from '../types/device'

const initialState = {
  uuid: '1234567890',
  platform: '',
  device_name: ''
}

const DeviceReducer = (state = initialState, action) => {
  switch(action.type) {
    case types.SAVE_DEVICE_INFO:
      return {...state, ...action.data}
    default:
      return state
  }
}

export default DeviceReducer
