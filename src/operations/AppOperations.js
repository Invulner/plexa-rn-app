import UserOperations from './UserOperations'
import FeedOperations from './FeedOperations'

const fetchFreshData = (navigation, filters) => {
  return dispatch => {
    dispatch(UserOperations.getProfileData(navigation))
    dispatch(FeedOperations.refreshFeed(filters))
  }  
}

export default {
  fetchFreshData
}
