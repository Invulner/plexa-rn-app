import { API_URL } from '../constants'
import getAxiosInstance from '../config/axios'
import PublicUserActions from '../actions/PublicUserActions'

const getPublicUserProfile = (navigation) => {
  return dispatch => {

    dispatch(PublicUserActions.togglePublicUserLoading(true))
    //Chosen by convinience for now
    const fallBackId = 299
    const id = navigation.getParam('id', fallBackId)

    return getAxiosInstance().then(api => {
      api.get(`${API_URL}/profiles/${id}`)
        .then(response => {
          dispatch(PublicUserActions.savePublicUserData(response.data))
          dispatch(PublicUserActions.togglePublicUserLoading(false))
        })
        .catch(error => console.log('PUBLIC USER PROFILE REQUEST ERROR: ', error))
    })
  }
}

const clearPublicUserData = () => {
  return dispatch => dispatch(PublicUserActions.clearPublicUserData())
}

export default {
  getPublicUserProfile,
  clearPublicUserData
}
