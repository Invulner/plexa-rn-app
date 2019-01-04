import React, { Component } from 'react'
import { Constants } from 'expo'
import { connect } from 'react-redux'
import { View, Image, StyleSheet } from 'react-native'
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
    return (
      <View style={styles.container}>
        <Image 
          style={styles.image}
          source={require('../assets/images/nav-bg_final-01.png')}
        />
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

export default connect(null, mapDispatchToProps)(AppLoadingScreen)
