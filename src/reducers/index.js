import { combineReducers } from 'redux'
import DeviceReducer from './DeviceReducer'
import UserReducer from './UserReducer'
import FeedReducer from './FeedReducer'
import PublicUserReducer from './PublicUserReducer'
import CommentsReducer from './CommentsReducer'
import ResearchFeedReducer from './ResearchFeedReducer'
import PostReducer from './PostReducer'
import LocationsReducer from './LocationsReducer'
import ChatsReducer from './ChatsReducer'
import NetworkReducer from './NetworkReducer'

const rootReducer = combineReducers({
  device: DeviceReducer,
  user: UserReducer,
  feed: FeedReducer,
  publicUser: PublicUserReducer,
  comments: CommentsReducer,
  researchFeed: ResearchFeedReducer,
  post: PostReducer,
  locations: LocationsReducer,
  chats: ChatsReducer,
  network: NetworkReducer
})

export default rootReducer
