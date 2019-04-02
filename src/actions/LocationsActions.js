import types from '../types/locations'

const saveLocations = (locations) => ({
  type: types.SAVE_LOCATIONS,
  locations
})

const toggleLoading = (flag) => ({
  type: types.TOGGLE_LOADING,
  flag
})

const resetLocations = () => ({
  type: types.RESET_LOCATIONS
})

const saveLocation = (item) => ({
  type: types.SAVE_LOCATION,
  item
})

export default {
  saveLocations,
  toggleLoading,
  resetLocations,
  saveLocation
}
