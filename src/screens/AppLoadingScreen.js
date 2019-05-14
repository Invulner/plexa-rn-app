import React, { Component } from 'react'
import { Constants } from 'expo'
import { connect } from 'react-redux'
import { View, Image, StyleSheet, NetInfo } from 'react-native'
import DeviceActions from '../actions/DeviceActions'
import UserOperations from '../operations/UserOperations'
import utils from '../utils'
import ConnectionActions from '../actions/ConnectionActions'

const mapStateToProps = (state) => {
  const { user } = state

  return { user }
}

const mapDispatchToProps = (dispatch, { navigation }) => {
  const saveDeviceInfo = (data) => dispatch(DeviceActions.saveDeviceInfo(data))
  const getProfileData = (cb) => dispatch(UserOperations.getProfileData(navigation, cb))
  const updateConnectionStatus = (isConnected) => dispatch(ConnectionActions.updateConnectionStatus(isConnected))

  return { 
    saveDeviceInfo,
    getProfileData,
    updateConnectionStatus
  }
}

class AppLoadingScreen extends Component {
  getProfileDataInBackground = (isConnected) => {
    const cb = () => NetInfo.isConnected.removeEventListener('connectionChange', this.getProfileDataInBackground)

    isConnected && this.props.getProfileData(cb)
  }

  onConnectionChange = (isConnected) => this.props.updateConnectionStatus(isConnected)

  goToApp = () => {
    this.props.navigation.navigate('App')
    NetInfo.isConnected.addEventListener('connectionChange', this.getProfileDataInBackground)
  }
  
  componentDidMount() {
    const { saveDeviceInfo, user, navigation: { navigate } } = this.props
    const data = {
      uuid: Constants.installationId || Constants.deviceId,
      platform: Object.keys(Constants.platform)[0],
      device_name: Constants.deviceName
    }
    
    utils.isConnectedFetchInterval()
    NetInfo.isConnected.addEventListener('connectionChange', this.onConnectionChange)
    saveDeviceInfo(data)
    user.id ? this.goToApp() : navigate('Auth')
  }

  render() {
    return (
      <View style={styles.container}>
        <Image 
          style={styles.image}
          source={require('../assets/images/nav-bg_final-01.png')} />
    </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch'
  },
  
  image: {
    width: '100%',
    flex: 1,
    resizeMode: 'cover'
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(AppLoadingScreen)
