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
  const { items, loading, savedLocation } = state.locations

  return {
    location,
    location_id,
    items,
    loading,
    savedLocation
  }
}

const mapDispatchToProps = (dispatch) => {
  const saveLocationID = (id) => dispatch(PostActions.saveLocationID(id))
  const deleteLocationID = () => dispatch(PostActions.deleteLocationID())
  const getLocations = (param) => dispatch(LocationsOperations.getLocations(param))
  const resetLocations = () => dispatch(LocationsActions.resetLocations())
  const saveLocationObj = (obj) => dispatch(LocationsActions.saveLocationObj(obj))
  const deleteLocationObj = () => dispatch(LocationsActions.deleteLocationObj())

  return {
    saveLocationID,
    deleteLocationID,
    getLocations,
    resetLocations,
    saveLocationObj,
    deleteLocationObj
  }
}

class AddLocationScreen extends Component {
  state = {
    input: ''
  }

  navigateToComposeScreen = () => {
    this.props.navigation.navigate('Compose')
  }

  onLocationPress = (item) => {
    const { saveLocationID, resetLocations, saveLocationObj } = this.props

    saveLocationID(item.id)
    saveLocationObj(item)
    resetLocations()
    this.navigateToComposeScreen()
  }

  onAllLocationsPress = () => {
    const { deleteLocationID, deleteLocationObj } = this.props

    deleteLocationID()
    deleteLocationObj()
    this.navigateToComposeScreen()
  }

  onInputChange = (input) => {
    this.setState({ input }, this.getLocations)
  }

  getLocations = debounce(() => this.props.getLocations(this.state.input), 1000)

  renderUserLocations = () => {
    const { location_id, location, savedLocation } = this.props

    const ifRenderSavedLocation = () => {
      return savedLocation && !location.filter(item => item.id === location_id).length
    }
    let newArr = ifRenderSavedLocation() ? [savedLocation, ...location] : location

    return newArr.map(item => (
      <UserListItem
        name={item.name}
        isChosen={location_id === item.id}
        key={item.id}
        onItemPress={() => this.onLocationPress(item)} />
    ))
  }

  renderRemoteLocations = () => {
    const { location_id, items } = this.props

    return items.map(item => (
      <UserListItem
        name={item.name}
        isChosen={location_id === item.id}
        key={item.id}
        onItemPress={() => this.onLocationPress(item)} />
    ))
  }

  renderLocationsLists = () => {
    const { items, location_id } = this.props

    if (items.length)
      return this.renderRemoteLocations()
    else
      return (
        <React.Fragment>
          <UserListItem
            name={'All Locations'}
            isChosen={!location_id}
            onItemPress={this.onAllLocationsPress} />
          {this.renderUserLocations()}
        </React.Fragment>
      )
  }

  render() {
    const { loading } = this.props

    return (
      <SafeArea>
        <ScrollView>
          <TextInput
            placeholderTextColor={'#fff'}
            placeholder='Search for location ...'
            style={styles.searchField}
            onChangeText={this.onInputChange} />
            {loading ?
              <Loader style={styles.loader} />
              :
              this.renderLocationsLists()
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
  },

  loader: {
    marginTop: 15
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(AddLocationScreen)
