import { combineReducers } from 'redux'
import DeviceReducer from './DeviceReducer'
import UserReducer from './UserReducer'
import FeedReducer from './FeedReducer'
import PublicUserReducer from './PublicUserReducer'
import CommentsReducer from './CommentsReducer'
import ResearchFeedReducer from './ResearchFeedReducer'

const rootReducer = combineReducers({
  device: DeviceReducer,
  user: UserReducer,
  feed: FeedReducer,
  publicUser: PublicUserReducer,
  comments: CommentsReducer,
  researchFeed: ResearchFeedReducer
})

export default rootReducer
