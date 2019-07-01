import React, { Component } from 'react'
import { ScrollView, TextInput, StyleSheet } from 'react-native'
import SafeArea from '../components/common/SafeArea'
import { connect } from 'react-redux'
import ListItem from '../components/compose/ListItem'
import { BRAND_LIGHT } from '../assets/styles/colors'
import LocationsOperations from '../operations/LocationsOperations'
import debounce from 'lodash.debounce'
import Loader from '../components/common/Loader'
import LocationsActions from '../actions/LocationsActions'
import { RegularText } from '../components/common/fonts'
import { GRAY } from '../assets/styles/colors'

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
  const getLocations = (q) => dispatch(LocationsOperations.getLocations(q))
  const deleteLocations = () => dispatch(LocationsActions.deleteLocations())
  const saveLocation = (obj) => dispatch(LocationsOperations.saveLocation(obj))
  const deleteLocation = () => dispatch(LocationsOperations.deleteLocation())

  return {
    getLocations,
    deleteLocations,
    saveLocation,
    deleteLocation
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
    const { deleteLocations, saveLocation } = this.props

    saveLocation(item)
    deleteLocations()
    this.navigateToComposeScreen()
  }

  onAllLocationsPress = () => {
    this.props.deleteLocation()
    this.navigateToComposeScreen()
  }

  onInputChange = (input) => {
    this.setState({ input }, () => this.toggleLocations(input))
  }

  toggleLocations = (input) => {
    if (!input) {
      this.props.deleteLocations()
      this.getLocations.cancel()
    } else {
      this.getLocations(input)
    }
  }

  getLocations = debounce((input) => this.props.getLocations(input), 1000)

  renderUserLocations = () => {
    const { location_id, location, savedLocation } = this.props
    let newArr

    if (savedLocation && !location) {
      newArr = [savedLocation]
    } else if (savedLocation && !location.find(item => item.id === location_id)) {
      newArr = [savedLocation, ...location]
    } else {
      newArr = location
    }

    return newArr && newArr.map(item => (
      <ListItem
        name={item.name}
        isChosen={location_id === item.id}
        key={item.id}
        onItemPress={() => this.onLocationPress(item)} />
    ))
  }

  renderRemoteLocations = () => {
    const { location_id, items } = this.props

    return items.map(item => (
      <ListItem
        name={item.name}
        isChosen={location_id === item.id}
        key={item.id}
        onItemPress={() => this.onLocationPress(item)} />
    ))
  }

  renderNoResults = () => {
    return <RegularText style={styles.noResults}>No results</RegularText>
  }

  renderLocationsLists = () => {
    const { items, location_id } = this.props

    if (items === null) {
      return (
        <React.Fragment>
          <ListItem
            name={'All Locations'}
            isChosen={!location_id}
            onItemPress={this.onAllLocationsPress} />
          {this.renderUserLocations()}
        </React.Fragment>
      )
    } else {
      return items.length ? this.renderRemoteLocations() : this.renderNoResults()
    }
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
  },

  noResults: {
    paddingTop: 10,
    color: GRAY,
    alignSelf: 'center'
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(AddLocationScreen)
