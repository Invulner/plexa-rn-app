import React, { Component } from 'react'
import { Constants } from 'expo'
import { connect } from 'react-redux'
import { View, Image, StyleSheet } from 'react-native'
import DeviceActions from '../actions/DeviceActions'

const mapStateToProps = (state) => {
  const { user } = state

  return { user }
}

const mapDispatchToProps = (dispatch) => {
  const saveDeviceInfo = (data) => dispatch(DeviceActions.saveDeviceInfo(data))

  return { 
    saveDeviceInfo
  }
}

class AppLoadingScreen extends Component {
  componentDidMount() {
    const { saveDeviceInfo, user, navigation: { navigate } } = this.props
    const data = {
      uuid: Constants.installationId || Constants.deviceId,
      platform: Object.keys(Constants.platform)[0],
      device_name: Constants.deviceName
    }
    
    saveDeviceInfo(data)
    user.id ? navigate('App') : navigate('Auth')
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
