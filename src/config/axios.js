import Axios from 'axios'
import { AsyncStorage } from 'react-native'

const getAxiosInstance = async (optionalHeaders) => {
  try {
    let secretData = await AsyncStorage.getItem('secretData')

    if (secretData) {
      secretData = JSON.parse(secretData)
      const setParams = () => {
        const headers = {
          'Uid': secretData.uid,
          'Access-Token': secretData['access-token'],
          'Client': secretData.client
        }

        if (optionalHeaders) 
          return {
            headers: {
              ...headers,
              ...optionalHeaders
            }
          }
        else
          return { headers }
      }

      return Axios.create(setParams())
    }

  } catch (error) {
    console.log('AXIOS CONFIG FILE ERROR: ', error)
  }
}

export default getAxiosInstance
