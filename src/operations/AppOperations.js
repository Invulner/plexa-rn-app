import UserOperations from './UserOperations'
import FeedOperations from './FeedOperations'

const fetchFreshData = (navigation) => {
  return dispatch => {
    dispatch(UserOperations.getProfileData(navigation))
    dispatch(FeedOperations.refreshFeed())
  }  
}

export default {
  fetchFreshData
}
