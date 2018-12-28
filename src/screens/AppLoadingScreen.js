import React, { Component } from 'react'
import { Constants } from 'expo'
import { connect } from 'react-redux'
import { ActivityIndicator } from 'react-native'
import DeviceActions from '../actions/DeviceActions'
import AppOperations from '../operations/AppOperations'

const mapDispatchToProps = (dispatch, { navigation }) => {
  const saveDeviceInfo = (data) => dispatch(DeviceActions.saveDeviceInfo(data))
  const initializeApp = () => dispatch(AppOperations.initializeApp(navigation))

  return {
    saveDeviceInfo,
    initializeApp
  }
}

class AppLoadingScreen extends Component {
  componentWillMount() {
    const data = {
      uuid: Constants.installationId || Constants.deviceId,
      platform: Object.keys(Constants.platform)[0],
      device_name: Constants.deviceName
    }

    this.props.saveDeviceInfo(data)
    this.props.initializeApp()
  }

  render() {
    return <ActivityIndicator />
  }
}

export default connect(null, mapDispatchToProps)(AppLoadingScreen)
