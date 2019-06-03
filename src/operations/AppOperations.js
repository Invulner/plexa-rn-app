import UserOperations from './UserOperations'
import FeedOperations from './FeedOperations'
import NetworkActions from '../actions/NetworkActions'
import ChatsActions from '../actions/ChatsActions'
import { Notifications } from 'expo'
import cable from '../action_cable/cable_instance'

const fetchFreshData = (navigation, filter) => {
  return dispatch => {
    dispatch(UserOperations.getProfileData(navigation))
    dispatch(FeedOperations.refreshFeed(filter))
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
            dispatch(ChatsActions.updateUnreadCount(data.unread_count))
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
