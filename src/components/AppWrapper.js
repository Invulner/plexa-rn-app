import React from 'react'
import { connect } from 'react-redux'
import { AppState, NetInfo } from 'react-native'
import SwitchAppNavigator from '../navigators/SwitchAppNavigator'
import { createAppContainer } from 'react-navigation'
import registerForPushNotificationsAsync from '../config/registerForPushNotificationsAsync'
import AppOperations from '../operations/AppOperations'
import ChatsOperations from '../operations/ChatsOperations'
import DropdownAlert from 'react-native-dropdownalert'
import { Notifications } from 'expo'
import { NavigationActions } from 'react-navigation'
import utils from '../utils'
import NetworkActions from '../actions/NetworkActions'

const AppContainer = createAppContainer(SwitchAppNavigator)

const mapStateToProps = (state) => {
  const { user: { loading, id }, feed: { filter }} = state

  return {
    loading,
    id,
    filter
  }
}

const mapDispatchToProps = (dispatch) => {
  const connectToCable = () => dispatch(AppOperations.connectToCable())
  const updateChat = (data) => dispatch(ChatsOperations.updateChat(data))
  const getChats = () => dispatch(ChatsOperations.getChats())
  const fetchFreshData = (navigate, filter) => dispatch(AppOperations.fetchFreshData(navigate, filter))
  const updateConnectionStatus = (isConnected) => dispatch(NetworkActions.updateConnectionStatus(isConnected))

  return {
    connectToCable,
    getChats,
    updateChat,
    fetchFreshData,
    updateConnectionStatus
  }
}

class AppWrapper extends React.Component {
  _handleNotification = (notification) => {
    if (notification.origin === 'selected') {
      this._navigateToPage(notification.data)
    } else {
      this.dropdown.alertWithType('info', notification.data.title, notification.data.body)
      this.notificationData = notification.data
    }
    if (notification.data.type === 'message') {
      this.props.updateChat({room_id: notification.data.room_id, text: notification.data.body, created_at: Date.now(), increase_count: true})
    }
  }

  _handleAppStateChange = (nextAppState) => {
    if (nextAppState === 'active') {
      this.props.getChats()
    }
  }

  _navigateToPage = (data) => {
    if (data.type === 'answer') {
      this.navigateToRoute('Post', { postId: data.story_id })
    } else if (data.type === 'message') {
      this.navigateToRoute('Chat', { chatId: data.room_id, chatTitle: utils.truncate(data.title, 20) })
    }
  }

  _setupNetworkConnections () {
    this.props.connectToCable()
    registerForPushNotificationsAsync()
    this._notificationSubscription = Notifications.addListener(this._handleNotification)
  }

  isUserSaved = () => {
    return !!this.props.id
  }

  navigateToRoute = (routeName, params) => {
    this.navigator.dispatch(NavigationActions.navigate({routeName, params}))
  }

  onConnectionChange = (isConnected) => {
    const { updateConnectionStatus, fetchFreshData, filter } = this.props

    updateConnectionStatus(isConnected)
    !isConnected && utils.showConnectivityError()

    isConnected && this.isUserSaved() && fetchFreshData(this.navigateToRoute, filter)
  }

  addEventListeners = () => {
    NetInfo.isConnected.addEventListener('connectionChange', this.onConnectionChange)
    AppState.addEventListener('change', this._handleAppStateChange)
  }

  removeEventListeners = () => {
    AppState.removeEventListener('change', this._handleAppStateChange)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.loading !== this.props.loading && this.props.loading === false) {
      this._setupNetworkConnections()
    }
  }

  componentDidMount () {
    if (this.props.loading === false) {
      this._setupNetworkConnections()
    }

    this.addEventListeners()
    utils.startConnectionStatusWorker()
  }

  componentWillUnmount() {
    this.removeEventListeners()
  }

  render () {
    return (
    <React.Fragment>
      <AppContainer ref={ref => this.navigator = ref} />
      <DropdownAlert ref={ref => this.dropdown = ref}
        onClose={({ type, title, message, action }) => (action === 'tap') && this._navigateToPage(this.notificationData)}
        infoColor='#7e7763'
      />
    </React.Fragment>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppWrapper)
