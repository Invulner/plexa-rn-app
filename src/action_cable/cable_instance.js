import { WEB_SOCKET_URL } from '../constants'
import { AsyncStorage } from 'react-native'
import ActionCable from './cable'

const cable  = async () => {
  const secretData = await AsyncStorage.getItem('secretData')
  const creds = await JSON.parse(secretData)
  return ActionCable.createConsumer(WEB_SOCKET_URL + '?uid=' + creds.uid + '&client_id=' + creds.client + '&token=' + creds['access-token'])
}

export default cable()
