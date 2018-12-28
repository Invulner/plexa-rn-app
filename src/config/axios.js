import Axios from 'axios'
import { AsyncStorage } from 'react-native'

const getAxiosInstance = async () => {
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

      return Axios.create(params)
    }

  } catch (error) {
    console.log('AXIOS CONFIG FILE ERROR: ', error)
  }
}

export default getAxiosInstance
