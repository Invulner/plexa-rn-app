import { combineReducers } from 'redux'
import DeviceReducer from './DeviceReducer'
import UserReducer from './UserReducer'
import FeedReducer from './FeedReducer'
import PublicUserReducer from './PublicUserReducer'

const rootReducer = combineReducers({
  device: DeviceReducer,
  user: UserReducer,
  feed: FeedReducer,
  publicUser: PublicUserReducer
})

export default rootReducer
