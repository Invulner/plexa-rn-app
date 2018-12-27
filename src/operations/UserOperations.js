import Axios from 'axios'
import { API_URL } from '../constants'
import { Alert, AsyncStorage } from 'react-native'
import UserActions from '../actions/UserActions'
import getAxiosInstance from '../config/axios'

const auth = (credentials, navigation) => {
  return dispatch => {
    dispatch(UserActions.toggleUserDataLoading(true))

    return Axios.post(`${API_URL}/session/sign_in`, credentials)
      .then(response => onLoginSuccess(response.data.data, dispatch, navigation))
      .catch(() => onLoginFail(dispatch))
  }
}

const getProfileData = (navigation, cb) => {
  return dispatch => {

    return getAxiosInstance().then(api => {
      api.get(`${API_URL}/profiles/me`)
        .then(response => {
          dispatch(UserActions.saveUserData(response.data))
          cb && cb(navigation)
        })
        .catch(error => {
          console.log('USER OP SECRET DATA ERROR: ', error)
          redirectToLogin(navigation)
          clearUserSecretData()
        })
    })
  }
}

const clearUserSecretData = () => {
  AsyncStorage.removeItem('secretData', (error) => error ? console.log('ERROR: ', error) : null)
}

const redirectToLogin = (navigation) => {
  navigation.navigate('Auth')
}

const onLoginSuccess = (data, dispatch, navigation) => {
  const { id, email, provider, uid, customer_id, discuss_api_token } = data
  const userData = {id, email, provider, customer_id}
  const userSecretData = {uid, ...discuss_api_token}

  dispatch(UserActions.saveUserData(userData))
  saveUserToAsyncStorage(userSecretData)
  redirectToFeed(navigation)
  dispatch(UserActions.toggleUserDataLoading(false))
  getProfileData(dispatch)
}

const saveUserToAsyncStorage = (userSecretData) => { 
  AsyncStorage.setItem('secretData', JSON.stringify(userSecretData), (error) =>  error ? console.log('ERROR: ', error) : null)
}

const redirectToFeed = (navigation) => {
  navigation.navigate('Feed')
}

const onLoginFail = (dispatch) => {
  Alert.alert('Login error', 'Email or password is not correct')
  dispatch(UserActions.toggleUserDataLoading(false))
}

export default {
  auth,
  getProfileData
}
