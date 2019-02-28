import { combineReducers } from 'redux'
import DeviceReducer from './DeviceReducer'
import UserReducer from './UserReducer'
import FeedReducer from './FeedReducer'
import PublicUserReducer from './PublicUserReducer'
import CommentsReducer from './CommentsReducer'
import HeaderReducer from './HeaderReducer'

const rootReducer = combineReducers({
  device: DeviceReducer,
  user: UserReducer,
  feed: FeedReducer,
  publicUser: PublicUserReducer,
  comments: CommentsReducer,
  header: HeaderReducer
})

export default rootReducer
