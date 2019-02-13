import { API_URL } from '../constants'
import getAxiosInstance from '../config/axios'
import OtherUserActions from '../actions/OtherUserActions'

const getOtherUserProfile = (id, navigation) => {
  return dispatch => {

    return getAxiosInstance().then(api => {
      api.get(`${API_URL}/profiles/${id}`)
        .then(response => {
          console.log(response)
          dispatch(OtherUserActions.saveOtherUserData(response.data))
          navigation.navigate('UserProfile')
        })
        .catch(error => console.log('OTHER USER PROFILE REQUEST ERROR: ', error))
    })
  }
}

export default {
  getOtherUserProfile
}
