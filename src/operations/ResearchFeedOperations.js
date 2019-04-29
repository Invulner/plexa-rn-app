import getAxiosInstance from '../config/axios'
import ResearchFeedActions from '../actions/ResearchFeedActions'
import { API_URL } from '../constants'

const fetchResearchFeed = (saveOption, page = 1) => {
  return dispatch => {
    dispatch(ResearchFeedActions.toggleResearchFeedLoading(true))

    getAxiosInstance().then(api => {
      api.get(`${API_URL}/feed/featured?page=${page}`)
        .then(response => {

          switch(saveOption) {
            case 'add':
              dispatch(ResearchFeedActions.saveResearchFeedData(response.data))
              break
            case 'refresh':
              dispatch(ResearchFeedActions.refreshResearchFeed(response.data))
              break
          }
          dispatch(ResearchFeedActions.updateResearchFeedPage(page))
          dispatch(ResearchFeedActions.toggleResearchFeedLoading(false))
        }).catch(error => console.log('Request error: ', error))
    }).catch(error => console.log('Axios config error: ', error))
  }
}

const getResearchFeed = (page = 1) => {
  return dispatch => {
    dispatch(fetchResearchFeed('add', page))
  }
}

const refreshResearchFeed = () => {
  return dispatch => {
    dispatch(fetchResearchFeed('refresh'))
  }
}

export default {
  getResearchFeed,
  refreshResearchFeed
}
