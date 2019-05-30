import UserOperations from './UserOperations'
import FeedOperations from './FeedOperations'

const fetchFreshData = (navigation, filter) => {
  return dispatch => {
    dispatch(UserOperations.getProfileData(navigation))
    dispatch(FeedOperations.refreshFeed(filter))
  }  
}

export default {
  fetchFreshData
}
