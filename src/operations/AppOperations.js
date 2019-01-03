import { AsyncStorage } from 'react-native'
import UserOperations from './UserOperations'
 
const initializeApp = (navigation) => {
  return dispatch => {
    checkForSavedCreds(dispatch, navigation)
  }
}

const checkForSavedCreds = async (dispatch, navigation) => {
  try {
    const secretData = await AsyncStorage.getItem('secretData')

    if (secretData) {
      const successCallback = () => {
        navigation.navigate('Feed')
      }
      dispatch(UserOperations.getProfileData(navigation, successCallback))
    } else {
      console.log('storage is empty')
      navigateToLogin(navigation)
    }

  } catch (error) {
      console.log('ASYNC STORAGE ERROR: ', error)
  }
}

const navigateToLogin = (navigation) => {
  navigation.navigate('Auth')
}

export default {
  initializeApp
}