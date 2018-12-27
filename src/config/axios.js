import Axios from 'axios'
import { AsyncStorage } from 'react-native'

const apiCall = async () => {
  try {
    let secretData = await AsyncStorage.getItem('secretData')

    if (secretData) {
      secretData = JSON.parse(secretData)
      const params = {
        headers: {
          'Uid': secretData.uid,
          'Access-Token': secretData['access-token'],
          'Client': secretData.client
        }
      }
      const request = Axios.create(params)

      return request
    }

  } catch (error) {
    console.log('config file', error)
  }
}

export default apiCall
