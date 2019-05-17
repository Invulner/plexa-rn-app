import UserOperations from './UserOperations'
import FeedOperations from './FeedOperations'

const fetchFreshData = () => {
  return dispatch => {
    dispatch(UserOperations.getProfileData())
    dispatch(FeedOperations.refreshFeed())
  }  
}

export default {
  fetchFreshData
}
