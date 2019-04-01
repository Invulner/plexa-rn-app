import React, { Component } from 'react'
import { ScrollView, TextInput, StyleSheet } from 'react-native'
import SafeArea from '../components/common/SafeArea'
import { connect } from 'react-redux'
import PostActions from '../actions/PostActions'
import UserListItem from '../components/compose/UserListItem'
import { BRAND_LIGHT } from '../assets/styles/colors'
import LocationsOperations from '../operations/LocationsOperations'
import debounce from 'lodash.debounce'

const mapStateToProps = (state) => {
  const { location } = state.user
  const { location_id } = state.post
  const { items } = state.locations

  return {
    location,
    location_id,
    items
  }
}

const mapDispatchToProps = (dispatch) => {
  const saveLocation = (id) => dispatch(PostActions.saveLocation(id))
  const deleteLocation = () => dispatch(PostActions.deleteLocation())
  const getLocations = (param) => dispatch(LocationsOperations.getLocations(param))

  return {
    saveLocation,
    deleteLocation,
    getLocations
  }
}

class AddLocationScreen extends Component {
  state = {
    input: ''
  }

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

  onInputChange = (input) => {
    this.setState({ input }, this.getLocations)
  }

  getLocations = debounce(() => this.props.getLocations(this.state.input), 1000)

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
          <TextInput
            placeholder='Search for location ...'
            style={styles.searchField}
            onChangeText={this.onInputChange} />
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

const styles = StyleSheet.create({
  searchField: {
    height: 50,
    paddingHorizontal: 10,
    fontSize: 18,
    color: '#fff',
    backgroundColor: BRAND_LIGHT
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(AddLocationScreen)
