import types from '../types/locations'

const saveLocations = (locations) => ({
  type: types.SAVE_LOCATIONS,
  locations
})

const toggleLoading = (flag) => ({
  type: types.TOGGLE_LOADING,
  flag
})

export default {
  saveLocations,
  toggleLoading
}
