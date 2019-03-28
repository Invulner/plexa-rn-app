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

// data
// :
// Object
// id
// :
// 120
// preview_url
// :
// "https://plexa-images-staging2.s3.amazonaws.com/discuss/story_image/image/120/preview_RackMultipart20190328-19487-mn5n2x.jpg"
// url
// :
// "https://plexa-images-staging2.s3.amazonaws.com/discuss/story_image/image/120/full_RackMultipart20190328-19487-mn5n2x.jpg"
