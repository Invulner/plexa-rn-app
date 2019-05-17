import { WEB_SOCKET_URL } from '../constants'
import { AsyncStorage } from 'react-native'
import Consumer from './consumer'

const cable  = async () => {
  const secretData = await AsyncStorage.getItem('secretData')
  const creds = await JSON.parse(secretData)
  return new Consumer(WEB_SOCKET_URL + '?uid=' + encodeURIComponent(creds.uid) + '&client_id=' + creds.client + '&token=' + creds['access-token'])
}

export default cable
