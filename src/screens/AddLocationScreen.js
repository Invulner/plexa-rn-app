import React, { Component } from 'react'
import { ScrollView, TextInput, StyleSheet } from 'react-native'
import SafeArea from '../components/common/SafeArea'
import { connect } from 'react-redux'
import PostActions from '../actions/PostActions'
import UserListItem from '../components/compose/UserListItem'
import { BRAND_LIGHT } from '../assets/styles/colors'
import LocationsOperations from '../operations/LocationsOperations'
import debounce from 'lodash.debounce'
import Loader from '../components/common/Loader'
import LocationsActions from '../actions/LocationsActions'

const mapStateToProps = (state) => {
  const { location } = state.user
  const { location_id } = state.post
  const { items, loading } = state.locations

  return {
    location,
    location_id,
    items,
    loading
  }
}

const mapDispatchToProps = (dispatch) => {
  const saveLocation = (id) => dispatch(PostActions.saveLocation(id))
  const deleteLocation = () => dispatch(PostActions.deleteLocation())
  const getLocations = (param) => dispatch(LocationsOperations.getLocations(param))
  const resetLocations = () => dispatch(LocationsActions.resetLocations())

  return {
    saveLocation,
    deleteLocation,
    getLocations,
    resetLocations
  }
}

class AddLocationScreen extends Component {
  state = {
    input: '',
    location: null
  }

  navigateToComposeScreen = () => {
    this.props.navigation.navigate('Compose')
  }

  onLocationPress = (item) => {
    const { saveLocation, resetLocations } = this.props

    saveLocation(item.id)
    this.setState({ location: item }, () => console.log(this.state.location))
    resetLocations()
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

  renderLocations = (locationsArr) => {
    const { location_id } = this.props

    return locationsArr.map(item => (
      <UserListItem
        name={item.name}
        isChosen={location_id === item.id}
        key={item.id}
        onItemPress={() => this.onLocationPress(item)} />
    ))
  }

  render() {
    const { location_id, location, items } = this.props

    return (
      <SafeArea>
        <ScrollView>
          <TextInput
            placeholder='Search for location ...'
            style={styles.searchField}
            onChangeText={this.onInputChange} />
            {!!items.length ?
              this.renderLocations(items)
              :
              <React.Fragment>
                <UserListItem
                  name={'All Locations'}
                  isChosen={!location_id}
                  onItemPress={this.onAllLocationsPress} />
                {this.renderLocations(location)}
              </React.Fragment>
            }
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
