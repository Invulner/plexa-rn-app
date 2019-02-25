import getAxiosInstance from '../config/axios'
import ResearchFeedActions from '../actions/ResearchFeedActions'
import { API_URL } from '../constants'

const getResearchFeed = () => {
  return dispatch => {
    dispatch(ResearchFeedActions.toggleResearchFeedLoading(true))

    getAxiosInstance().then(api => {
      api.get(`${API_URL}/feed/featured`)
        .then(response => {
          console.log('Research feed: ', response)
          dispatch(ResearchFeedActions.saveResearchFeedData(response.data))
          dispatch(ResearchFeedActions.toggleResearchFeedLoading(false))
        }).catch(error => console.log('Request error: ', error))
    }).catch(error => console.log('Axios config error: ', error))
  }
}

export default {
  getResearchFeed
}
