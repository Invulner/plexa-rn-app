import UserOperations from './UserOperations'
import FeedOperations from './FeedOperations'

const fetchFreshData = () => {
  return dispatch => {
    dispatch(FeedOperations.refreshFeed())
    dispatch(UserOperations.getProfileData())
  }  
}

export default {
  fetchFreshData
}
