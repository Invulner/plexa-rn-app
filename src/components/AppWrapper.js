import React from 'react'
import { connect } from 'react-redux'
import { Vibration, NetInfo } from 'react-native'
import SwitchAppNavigator from '../navigators/SwitchAppNavigator'
import { createAppContainer } from 'react-navigation'
import registerForPushNotificationsAsync from '../config/registerForPushNotificationsAsync'
import AppOperations from '../operations/AppOperations'
import DropdownAlert from 'react-native-dropdownalert'
import { Notifications } from 'expo'
import { NavigationActions } from 'react-navigation'
import NetworkActions from '../actions/NetworkActions'
import utils from '../utils'

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
  const updateConnectionStatus = (isConnected) => dispatch(NetworkActions.updateConnectionStatus(isConnected))
  const fetchFreshData = (navigation, filter) => dispatch(AppOperations.fetchFreshData(navigation, filter))

  return {
    connectToCable,
    updateConnectionStatus,
    fetchFreshData
  }
}

class AppWrapper extends React.Component {

  _handleNotification = (notification) => {
    Vibration.vibrate(1000)

    if (notification.origin === 'selected') {
      this._navigateToPage(notification.data)
    } else {
      this.dropdown.alertWithType('info', notification.data.title, notification.data.body)
      this.notificationData = notification.data
    }
  }

  _navigateToPage = (data) => {
    if (data.type === 'answer') {
      this.navigateToRoute('Post', { postId: data.story_id })
    } else if (data.type === 'message') {
      this.navigateToRoute('Chat', { chatId: data.room_id })
    }
  }

  _setupNetworkConnections () {
    this.props.connectToCable()
    registerForPushNotificationsAsync()
    this._notificationSubscription = Notifications.addListener(this._handleNotification)
  }

  isUserSaved = () => {
    return this.props.id
  }

  navigateToRoute = (route, params) => {
    this.navigator.dispatch(NavigationActions.navigate({routeName: route, params}))
  }

  onConnectionChange = (isConnected) => {
    const { updateConnectionStatus, fetchFreshData, filter } = this.props

    updateConnectionStatus(isConnected)
    !isConnected && utils.showConnectivityError()

    isConnected && this.isUserSaved() && fetchFreshData(this.navigateToRoute, filter)
  }

  addEventListeners = () => {
    NetInfo.isConnected.addEventListener('connectionChange', this.onConnectionChange)
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

    utils.startConnectionStatusWorker()
    this.addEventListeners()
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
