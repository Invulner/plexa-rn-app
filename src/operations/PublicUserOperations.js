import { API_URL } from '../constants'
import getAxiosInstance from '../config/axios'
import PublicUserActions from '../actions/PublicUserActions'

const getPublicUserProfile = (id, navigation) => {
  return dispatch => {

    dispatch(PublicUserActions.togglePublicUserLoading(true))
    navigation.navigate('PublicProfile')

    return getAxiosInstance().then(api => {
      api.get(`${API_URL}/profiles/${id}`)
        .then(response => {
          console.log(response)
          dispatch(PublicUserActions.savePublicUserData(response.data))
          dispatch(PublicUserActions.togglePublicUserLoading(false))
        })
        .catch(error => console.log('OTHER USER PROFILE REQUEST ERROR: ', error))
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
