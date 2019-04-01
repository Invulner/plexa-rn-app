import React, { Component } from 'react'
import { ScrollView, TouchableOpacity, StyleSheet, View, Image } from 'react-native'
import SafeArea from '../components/common/SafeArea'
import Loader from '../components/common/Loader'
import GreyLine from '../components/common/GreyLine'
import { RegularText } from '../components/common/fonts'
import { connect } from 'react-redux'
import PostActions from '../actions/PostActions'
import { DARK_GRAY } from '../assets/styles/colors'

const mapStateToProps = (state) => {
  const { location } = state.user
  const { location_id } = state.post

  return {
    location,
    location_id
  }
}

const mapDispatchToProps = (dispatch) => {
  const saveLocation = (id) => dispatch(PostActions.saveLocation(id))
  const deleteLocation = () => dispatch(PostActions.deleteLocation())

  return {
    saveLocation,
    deleteLocation
  }
}

class AddLocationScreen extends Component {
  navigateToComposeScreen = () => {
    this.props.navigation.navigate('Compose')
  }

  onLocationPress = (id) => {
    const { saveLocation } = this.props

    saveLocation(id)
    this.navigateToComposeScreen()
  }

  onAllLocationsPress = () => {
    const { deleteLocation } = this.props

    deleteLocation()
    this.navigateToComposeScreen()
  }

  renderIcon = () => {
    return (
      <Image
        style={styles.icon}
        source={require('../assets/icons/checked.png')} />
    )
  }

  renderLocation = () => {
    const { location, location_id } = this.props

    return location.map(item => {

      return (
        <View key={item.id}>
          <View style={styles.groupBox}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => this.onLocationPress(item.id)}>
              <RegularText style={styles.groupText}>
                {item.name}
              </RegularText>
            </TouchableOpacity>
            {location_id === item.id && this.renderIcon()}
          </View>
          <GreyLine boxStyle={styles.lineSolid}/>
        </View>
      )
    })
  }

  componentDidMount() {
    // this.props.refreshUserProfile()
  }

  render() {
    const { location_id } = this.props

    return (
      <SafeArea>
        <ScrollView>
          <View style={styles.groupBox}>
            <TouchableOpacity
              style={styles.btn}
              onPress={this.onAllLocationsPress}>
              <RegularText style={styles.groupText}>
                All Locations
              </RegularText>
            </TouchableOpacity>
            {!location_id && this.renderIcon()}
          </View>
          <GreyLine boxStyle={styles.lineSolid}/>
          {this.renderLocation()}
        </ScrollView>
      </SafeArea>
    )
  }
}

const styles = StyleSheet.create({
  lineSolid: {
    paddingHorizontal: 0
  },

  btn: {
    flex: 1
  },

  groupBox: {
    height: 50,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },

  groupText: {
    fontSize: 18,
    marginTop: 10,
    color: DARK_GRAY
  },

  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain'
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(AddLocationScreen)
