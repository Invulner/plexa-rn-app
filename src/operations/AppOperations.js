import UserOperations from './UserOperations'
import FeedOperations from './FeedOperations'
import NetworkActions from '../actions/NetworkActions'
import { Notifications } from 'expo'
import cable from '../action_cable/cable_instance'

const fetchFreshData = (navigation) => {
  return dispatch => {
    dispatch(UserOperations.getProfileData(navigation))
    dispatch(FeedOperations.refreshFeed())
  }  
}

const connectToCable = () => {
  return dispatch => {
    cable().then(cable_i => {
      global.cableInstance = cable_i
      dispatch(NetworkActions.updateCableConnectionStatus(true))

      const statusChannel = global.cableInstance.subscriptions.create(
        {
          channel: 'StatusChannel'
        },
        {
          received: (data) => {
            Notifications.setBadgeNumberAsync(data.unread_count)
          }
        }
      )
    })
  }
}

const disconnectFromWs = () => {
  global.cableInstance.disconnect()
}

export default {
  fetchFreshData,
  disconnectFromWs,
  connectToCable
}
