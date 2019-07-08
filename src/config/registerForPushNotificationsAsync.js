import { Notifications } from 'expo'
import * as Permissions from 'expo-permissions'
import { PUSH_ENDPOINT } from '../constants'
import { AsyncStorage } from 'react-native'
import Constants from 'expo-constants'
import getAxiosInstance from './axios'

const registerForPushNotificationsAsync = async () => {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== 'granted') {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== 'granted') {
    return;
  }

  // Get the token that uniquely identifies this device
  let token = await Notifications.getExpoPushTokenAsync();
  let secretData = await AsyncStorage.getItem('secretData')
  secretData = JSON.parse(secretData)

  const optionalHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
  const data = {
    push_token: token,
    uuid: Constants.installationId || Constants.deviceId,
    platform: Object.keys(Constants.platform)[0],
    device_name: Constants.deviceName
  }

  return getAxiosInstance(optionalHeaders).then(api => {
    api.post(PUSH_ENDPOINT, data)
  })
}

export default registerForPushNotificationsAsync
