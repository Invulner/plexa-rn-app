import React, { Component } from 'react'
import { Constants } from 'expo'
import { connect } from 'react-redux'
import { View, Image, StyleSheet, NetInfo } from 'react-native'
import DeviceActions from '../actions/DeviceActions'
import utils from '../utils'
import AppOperations from '../operations/AppOperations'
import NetworkActions from '../actions/NetworkActions'

const mapStateToProps = (state) => {
  const { user } = state

  return { user }
}

const mapDispatchToProps = (dispatch) => {
  const saveDeviceInfo = (data) => dispatch(DeviceActions.saveDeviceInfo(data))
  const updateConnectionStatus = (isConnected) => dispatch(NetworkActions.updateConnectionStatus(isConnected))
  const fetchFreshData = () => dispatch(AppOperations.fetchFreshData())

  return { 
    saveDeviceInfo,
    fetchFreshData,
    updateConnectionStatus
  }
}

class AppLoadingScreen extends Component {
  goToApp = () => {
    const { navigation } = this.props

    navigation.navigate('App')
    NetInfo.isConnected.addEventListener('connectionChange', this.fetchFreshData)
  }

  fetchFreshData = (isConnected) => {
    isConnected && this.props.fetchFreshData()
  }

  updateConnectionStatus = (isConnected) => {
    this.props.updateConnectionStatus(isConnected)
    !isConnected && utils.showConnectivityError()
  }
  
  componentDidMount() {
    const { saveDeviceInfo, user, navigation: { navigate } } = this.props
    const data = {
      uuid: Constants.installationId || Constants.deviceId,
      platform: Object.keys(Constants.platform)[0],
      device_name: Constants.deviceName
    }
    
    utils.startConnectionStatusWorker()
    NetInfo.isConnected.addEventListener('connectionChange', this.updateConnectionStatus)
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
