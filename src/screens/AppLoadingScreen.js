import React, { Component } from 'react'
import { Constants } from 'expo'
import { connect } from 'react-redux'
import { ActivityIndicator } from 'react-native'
import DeviceActions from '../actions/DeviceActions'

const mapDispatchToProps = (dispatch) => {
  const saveDeviceInfo = (data) => dispatch(DeviceActions.saveDeviceInfo(data))

  return {
    saveDeviceInfo
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
  }

  componentDidMount() {
    setTimeout(() => {
      this.goToNextScreen()
    }, 2000)
  }

  goToNextScreen() {
    this.props.navigation.navigate('Auth')
  }

  render() {
    return <ActivityIndicator />
  }
}

export default connect(null, mapDispatchToProps)(AppLoadingScreen)
