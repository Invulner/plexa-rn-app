import getAxiosInstance from '../config/axios'
import ResearchFeedActions from '../actions/ResearchFeedActions'
import { API_URL } from '../constants'

const fetchResearchFeed = (saveOption, { page, silent } = {}) => {
  return dispatch => {
    !silent && dispatch(ResearchFeedActions.toggleResearchFeedLoading(true))

    return getAxiosInstance().then(api => {
      const currentPage = page || 1
      api.get(`${API_URL}/feed/featured?page=${currentPage}`)
        .then(response => {

          switch(saveOption) {
            case 'add':
              dispatch(ResearchFeedActions.saveResearchFeedData(response.data))
              break
            case 'refresh':
              dispatch(ResearchFeedActions.refreshResearchFeed(response.data))
              break
          }
          dispatch(ResearchFeedActions.updateResearchFeedPage(currentPage))
          !silent && dispatch(ResearchFeedActions.toggleResearchFeedLoading(false))
        }).catch(error => console.log('fetchResearchFeed error: ', error))
    }).catch(error => console.log('Axios config error: ', error))
  }
}

const getResearchFeed = (page = 1) => {
  return dispatch => {
    dispatch(fetchResearchFeed('add', { page }))
  }
}

const refreshResearchFeed = (params) => {
  return dispatch => {
    dispatch(fetchResearchFeed('refresh', params))
  }
}

export default {
  getResearchFeed,
  refreshResearchFeed
}
