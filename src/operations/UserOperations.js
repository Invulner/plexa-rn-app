import Axios from 'axios'
import { apiURL } from '../constants'
import { Alert, AsyncStorage } from 'react-native'
import actions from '../actions/UserActions'

const auth = (credentials) => {

  return dispatch => {
    
    return Axios.post(`${apiURL}/session/sign_in`, credentials)
      .then(response => onLoginSuccess(response.data.data, dispatch))
      .catch(error => onLoginFail(error))
  }
}

const onLoginSuccess = (data, dispatch) => {
  const { id, email, provider, uid, customer_id, discuss_api_token } = data
  const userData = {id, email, provider, customer_id}
  const userSecretData = {uid, ...discuss_api_token}
  dispatch(actions.saveUserData(userData))
  saveUserToAsyncStorage(userSecretData)
  redirect()
}

const saveUserToAsyncStorage = (userSecretData) => { 
  const { uid, client } = userSecretData
  const accessToken = userSecretData['access-token']
  const values = [ ['uid', uid], ['accessToken', accessToken], ['client', client] ]
  AsyncStorage.multiSet(values, (error) =>  error ? console.log('ERROR: ', error) : null)
}

const redirect = () => {
  console.log('redirected to new screen')
}

const onLoginFail = (error) => {
  console.log('ERROR: ', error) 
  Alert.alert('Login error', 'Email or password is not correct')
}

export default {
  auth
}
