import Axios from 'axios'
import { apiURL } from '../constants'
import { Alert } from 'react-native'
import { AsyncStorage } from 'react-native'


const auth = (credentials) => {
  return dispatch => {
    return Axios.post(apiURL, credentials)
      .then(response => onLoginSuccess(response))
      .catch(error => onLoginFail(error))
  }
}

const onLoginSuccess = (response) => {
  const { data: { id, email, provider, uid, customer_id, discuss_api_token } } = response
  const userData = { id, email, provider, customer_id }
  const asyncData = { uid, ...discuss_api_token }
  console.log(userData)
  dispatch(successAuth(userData))
  saveUserToAsyncStorage(asyncData)
  //redirect to new screen
}

const saveUserToAsyncStorage = async (asyncData) => {
  try {
    await AsyncStorage.setItem('user', asyncData)
  } catch (error) {
    console.log(error.message)
  }
}

const onLoginFail = (error) => {
  console.log('ERROR: ', error) 
  Alert.alert('Login error', 'Email or password is not correct')
}

export default {
  auth
}
