import Axios from 'axios'
import { apiURL } from '../constants'
import { Alert, AsyncStorage } from 'react-native'
import actions from '../actions/UserActions'

const auth = (credentials) => {

  return dispatch => {
    
    return Axios.post(`${apiURL}/session/sign_in`, credentials)
      .then(response => onLoginSuccess(response, dispatch))
      .catch(error => onLoginFail(error))
  }
}

const onLoginSuccess = (response, dispatch) => {
    console.log(response)
    const { data: { data: { id, email, provider, uid, customer_id, discuss_api_token } } } = response
    const userData = {id, email, provider, customer_id}
    const userSecretData = {uid, ...discuss_api_token}
    console.log(userData)
    dispatch(actions.saveUserData(userData))
    saveUserToAsyncStorage(userSecretData)
    redirect()
}

const saveUserToAsyncStorage = (userSecretData) => { 
  //AsyncStorage.setItem
  console.log('async Storage', userSecretData)
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
