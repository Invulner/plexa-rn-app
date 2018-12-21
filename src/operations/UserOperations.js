import Axios from 'axios'
import { apiURL } from '../constants'
import { Alert } from 'react-native'
import { AsyncStorage } from 'react-native'
import actions from '../actions/UserActions'
import store from '../store'

const { dispatch } = store

const auth = (credentials) => {
  return dispatch => {
    return Axios.post(apiURL, credentials)
      .then(response => onLoginSuccess(response))
      .catch(error => onLoginFail(error))
  }
}

const onLoginSuccess = (response) => {
  console.log(response)
  const { data: { data: { id, email, provider, uid, customer_id, discuss_api_token } } } = response
  const userData = {id, email, provider, customer_id}
  const asyncData = {uid, ...discuss_api_token}
  console.log(userData)
  dispatch(actions.successAuth(userData))
  saveUserToAsyncStorage(asyncData)
  redirect()
}

const saveUserToAsyncStorage = (asyncData) => { 
  console.log('async Storage', asyncData)
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
