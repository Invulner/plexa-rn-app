import React, { Component } from 'react'
import { Constants } from 'expo'
import { connect } from 'react-redux'
import { View, Image, StyleSheet, NetInfo, Alert } from 'react-native'
import DeviceActions from '../actions/DeviceActions'
import UserOperations from '../operations/UserOperations'

const mapStateToProps = (state) => {
  const { user } = state

  return { user }
}

const mapDispatchToProps = (dispatch, { navigation }) => {
  const saveDeviceInfo = (data) => dispatch(DeviceActions.saveDeviceInfo(data))
  const getProfileData = (cb) => dispatch(UserOperations.getProfileData(navigation, cb))

  return { 
    saveDeviceInfo,
    getProfileData
  }
}

class AppLoadingScreen extends Component {
  getProfileDataInBackground = () => {
    NetInfo.addEventListener('connectionChange', this.onConnectionChange)
  }

  onConnectionChange = ({ type }) => {
    const cb = () => NetInfo.removeEventListener('connectionChange', this.onConnectionChange)
    type !== 'none' && type !== 'unknown' && this.props.getProfileData(cb)
  }

  goToApp = () => {
    this.props.navigation.navigate('App')
    this.getProfileDataInBackground()
  }
  
  componentDidMount() {
    const { saveDeviceInfo, user, navigation: { navigate } } = this.props
    const data = {
      uuid: Constants.installationId || Constants.deviceId,
      platform: Object.keys(Constants.platform)[0],
      device_name: Constants.deviceName
    }
    
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
