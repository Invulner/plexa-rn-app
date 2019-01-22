import getAxiosInstance from '../config/axios'
import { API_URL } from '../constants'
import FeedActions from '../actions/FeedActions'

const getFeed = () => {
  return dispatch => {
    dispatch(FeedActions.toggleFeedDataLoading(true))

    return getAxiosInstance().then(api => {
      api.get(`${API_URL}/feed`)
        .then(response => {
          dispatch(FeedActions.saveFeedData(response.data))
          dispatch(FeedActions.updateFeedPage(1))
          console.log(response)
          dispatch(FeedActions.toggleFeedDataLoading(false))
        })
        .catch(error => console.log('Request error: ', error))
    })
    .catch(error => console.log('Axios config error: ', error))
  }
}

const loadMoreFeed = (page) => {
  return dispatch => {
    dispatch(FeedActions.toggleNextPageLoading(true))

    return getAxiosInstance().then(api => {
      api.get(`${API_URL}/feed?page=${page + 1}`)
        .then(response => {
          dispatch(FeedActions.saveFeedData(response.data))
          dispatch(FeedActions.updateFeedPage(page))
          console.log(response)
          console.log(page)
          dispatch(FeedActions.toggleNextPageLoading(false))
        })
        .catch(error => console.log('Request error: ', error))
    })
    .catch(error => console.log('Axios config error: ', error))
  }
}

export default {
  getFeed,
  loadMoreFeed
}

