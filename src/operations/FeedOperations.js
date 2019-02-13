import getAxiosInstance from '../config/axios'
import { API_URL } from '../constants'
import FeedActions from '../actions/FeedActions'

const fetchFeed = (saveOption, page = 1) => {
  return dispatch => {
    dispatch(FeedActions.toggleFeedDataLoading(true))

    return getAxiosInstance().then(api => {
      api.get(`${API_URL}/feed?page=${page}`)
        .then(response => {

          switch (saveOption) {
            case 'add':
              dispatch(FeedActions.saveFeedData(response.data))
              console.log('add to feed')
              break
            case 'refresh':
              dispatch(FeedActions.refreshFeed(response.data))
              console.log('refresh feed')
              break
            default:
              console.log('wrong saveOption')
              break
          }

          dispatch(FeedActions.updateFeedPage(page))
          console.log(response)
          dispatch(FeedActions.toggleFeedDataLoading(false))
        })
        .catch(error => console.log('Request error: ', error))
    })
    .catch(error => console.log('Axios config error: ', error))
  }
}

const getFeed = (page = 1) => {
  return dispatch => {
    dispatch(fetchFeed('add', page))
  }
}

const refreshFeed = () => {
  return dispatch => {
    dispatch(fetchFeed('refresh'))
  }
}

const clearFeed = () => {
  return dispatch => {
    dispatch(FeedActions.clearFeed())
  }
}

export default {
  getFeed,
  refreshFeed,
  clearFeed
}
