import UserOperations from './UserOperations'
import FeedOperations from './FeedOperations'
import ChatsOperations from '../operations/ChatsOperations'
import NetworkActions from '../actions/NetworkActions'
import ChatsActions from '../actions/ChatsActions'
import { Notifications } from 'expo'
import cable from '../action_cable/cable_instance'
import ResearchFeedOperations from './ResearchFeedOperations'

const fetchFreshData = (navigateToRoute, filter) => {
  return dispatch => {
    dispatch(UserOperations.getProfileData(navigateToRoute))
    dispatch(FeedOperations.refreshFeed({ ...filter, silent: true }))
    dispatch(ResearchFeedOperations.refreshResearchFeed({ silent: true }))
    dispatch(ChatsOperations.getChats())
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
            if (data.data.room) {
              const room = data.data.room
              room.last_message = data.data.last_message
              room.unread_count = data.data.unread_count
              dispatch(ChatsActions.updateChat(room))
            }
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
