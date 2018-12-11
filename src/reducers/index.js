import { combineReducers } from 'redux'
import DeviceReducer from './DeviceReducer'

const rootReducer = combineReducers({
  device: DeviceReducer,
})

export default rootReducer
