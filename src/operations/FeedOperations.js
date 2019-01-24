import getAxiosInstance from '../config/axios'
import { API_URL } from '../constants'
import FeedActions from '../actions/FeedActions'

const getFeed = (page = 1) => {
  return dispatch => {
    dispatch(FeedActions.toggleFeedDataLoading(true))

    return getAxiosInstance().then(api => {
      api.get(`${API_URL}/feed?page=${page}`)
        .then(response => {
          dispatch(FeedActions.saveFeedData(response.data))
          dispatch(FeedActions.updateFeedPage(page))
          console.log(response)
          dispatch(FeedActions.toggleFeedDataLoading(false))
        })
        .catch(error => console.log('Request error: ', error))
    })
    .catch(error => console.log('Axios config error: ', error))
  }
}

const refreshFeed = (feedData) => {
  return dispatch => {
    dispatch(FeedActions.toggleFeedDataLoading(true))

    return getAxiosInstance().then(api => {
      api.get(`${API_URL}/feed`)
        .then(response => {
          console.log(response)
          const newItems = response.data.filter(newPost => {
            feedData.forEach(oldPost => {
              return newPost.id !== oldPost.id
            })
          })
          console.log(newItems)
          dispatch(FeedActions.refreshFeed(newItems))
          dispatch(FeedActions.toggleFeedDataLoading(false))
        })
        .catch(error => console.log('Request error: ', error))
    })
    .catch(error => console.log('Axios config error: ', error))
  }
}

export default {
  getFeed,
  refreshFeed
}
