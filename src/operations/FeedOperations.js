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
          console.log(response.data)
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

const updateLike = (flag, item, index) => {
  return dispatch => {
    const param = {
      like: flag
    }

    return getAxiosInstance().then(api => {
      api.post(`${API_URL}/stories/${item.id}/like`, param)
        .then(response => {
          const payload = {
            ...item,
            liked: response.data.liked,
            likes_count: response.data.likes_count
          } 
          dispatch(FeedActions.updatePostLike(payload, index))})
          .catch(error => console.log('Like error: ', error))
    })
  }
}

export default {
  getFeed,
  refreshFeed,
  updateLike
}
