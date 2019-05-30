import React from 'react'
import { connect } from 'react-redux'
import { Vibration } from 'react-native'
import SwitchAppNavigator from '../navigators/SwitchAppNavigator'
import { createAppContainer } from 'react-navigation'
import registerForPushNotificationsAsync from '../config/registerForPushNotificationsAsync'
import AppOperations from '../operations/AppOperations'
import DropdownAlert from 'react-native-dropdownalert'
import { Notifications } from 'expo'
import { NavigationActions } from 'react-navigation'

const AppContainer = createAppContainer(SwitchAppNavigator)

const mapStateToProps = (state) => {
  const { user: { loading }} = state

  return {
    loading
  }
}

const mapDispatchToProps = (dispatch) => {
  const connectToCable = () => dispatch(AppOperations.connectToCable())

  return {
    connectToCable
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
      this.navigator.dispatch(NavigationActions.navigate({routeName: 'Post', params: { postId: data.story_id }}))
    } else if (data.type === 'message') {
      this.navigator.dispatch(NavigationActions.navigate({routeName: 'Chat', params: { chatId: data.room_id }}))
    }
  }

  _setupNetworkConnections () {
    this.props.connectToCable()
    registerForPushNotificationsAsync()
    this._notificationSubscription = Notifications.addListener(this._handleNotification)
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
