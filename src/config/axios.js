import Axios from 'axios'
import { AsyncStorage } from 'react-native'
import utils from '../utils'

const getAxiosInstance = async (optionalHeaders = {}) => {
  try {
    let secretData = await AsyncStorage.getItem('secretData')

    if (secretData) {
      secretData = JSON.parse(secretData)
      const params = {
        baseURL: utils.getBaseURL().https,
        headers: {
          'Uid': secretData.uid,
          'Access-Token': secretData['access-token'],
          'Client': secretData.client,
          'Client-Type': 'mobile',
          ...optionalHeaders
        }
      }

      return Axios.create(params)
    }

  } catch (error) {
    console.log('AXIOS CONFIG FILE ERROR: ', error)
  }
}

export default getAxiosInstance
