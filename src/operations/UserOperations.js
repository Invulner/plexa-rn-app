import Axios from 'axios'
import { API_URL } from '../constants'
import { Alert, AsyncStorage } from 'react-native'
import actions from '../actions/UserActions'

const auth = (credentials, navigation) => {
  return dispatch => {
    dispatch(actions.toggleUserDataLoading(true))

    return Axios.post(`${API_URL}/session/sign_in`, credentials)
      .then(response => onLoginSuccess(response.data.data, dispatch, navigation))
      .catch(() => onLoginFail(dispatch))
  }
}

const onLoginSuccess = (data, dispatch, navigation) => {
  const { id, email, provider, uid, customer_id, discuss_api_token } = data
  const userData = {id, email, provider, customer_id}
  const userSecretData = {uid, ...discuss_api_token}

  dispatch(actions.saveUserData(userData))
  saveUserToAsyncStorage(userSecretData)
  redirectToFeed(navigation)
  dispatch(actions.toggleUserDataLoading(false))
}

const saveUserToAsyncStorage = (userSecretData) => { 
  AsyncStorage.setItem('secretData', JSON.stringify(userSecretData), (error) =>  error ? console.log('ERROR: ', error) : null)
}

const redirectToFeed = (navigation) => {
  navigation.navigate('Feed')
}

const onLoginFail = (dispatch) => {
  Alert.alert('Login error', 'Email or password is not correct')
  dispatch(actions.toggleUserDataLoading(false))
}

export default {
  auth
}