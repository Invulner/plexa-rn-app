import { AsyncStorage } from 'react-native'
import Consumer from './consumer'
import utils from '../utils'

const cable  = async () => {
  const secretData = await AsyncStorage.getItem('secretData')
  const creds = await JSON.parse(secretData)
  return new Consumer(utils.getBaseURL().wss + '?uid=' + encodeURIComponent(creds.uid) + '&client_id=' + creds.client + '&token=' + creds['access-token'])
}

export default cable
