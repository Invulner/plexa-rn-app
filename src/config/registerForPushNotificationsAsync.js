import { Permissions, Notifications } from 'expo'
import { PUSH_ENDPOINT } from '../constants'
import { AsyncStorage } from 'react-native'
import Constants from 'expo-constants'

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

  // POST the token to your backend server from where you can retrieve it to send push notifications.
  return fetch(PUSH_ENDPOINT, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Uid': secretData.uid,
      'Access-Token': secretData['access-token'],
      'Client': secretData.client,
    },
    body: JSON.stringify({
      push_token: token,
      uuid: Constants.installationId || Constants.deviceId,
      platform: Object.keys(Constants.platform)[0],
      device_name: Constants.deviceName
    }),
  });
}

export default registerForPushNotificationsAsync
