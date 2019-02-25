import getAxiosInstance from '../config/axios'
import ResearchFeedActions from '../actions/ResearchFeedActions'
import { API_URL } from '../constants'

const fetchResearchFeed = (page = 1) => {
  return dispatch => {
    dispatch(ResearchFeedActions.toggleResearchFeedLoading(true))

    getAxiosInstance().then(api => {
      api.get(`${API_URL}/feed/featured?page=${page}`)
        .then(response => {
          console.log('Featured feed: ', response)
          dispatch(ResearchFeedActions.saveResearchFeedData(response.data))
          dispatch(ResearchFeedActions.toggleResearchFeedLoading(false))
          dispatch(ResearchFeedActions.updateResearchFeedPage(page))
        }).catch(error => console.log('Request error: ', error))
    }).catch(error => console.log('Axios config error: ', error))
  }
}

export default {
  fetchResearchFeed
}
