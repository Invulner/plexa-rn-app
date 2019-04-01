import React, { Component } from 'react'
import { ScrollView } from 'react-native'
import SafeArea from '../components/common/SafeArea'
import { connect } from 'react-redux'
import PostActions from '../actions/PostActions'
import UserListItem from '../components/compose/UserListItem'

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

  renderLocations = () => {
    const { location, location_id } = this.props

    return location.map(item => (
      <UserListItem
        name={item.name}
        isChosen={location_id === item.id}
        key={item.id}
        onItemPress={() => this.onLocationPress(item.id)} />
    ))
  }

  render() {
    const { location_id } = this.props

    return (
      <SafeArea>
        <ScrollView>
          <UserListItem
            name={'All Locations'}
            isChosen={!location_id}
            onItemPress={this.onAllLocationsPress} />
          {this.renderLocations()}
        </ScrollView>
      </SafeArea>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddLocationScreen)
