import { combineReducers } from 'redux'
import DeviceReducer from './DeviceReducer'
import UserReducer from './UserReducer'

const rootReducer = combineReducers({
  device: DeviceReducer,
  user: UserReducer
})

export default rootReducer
