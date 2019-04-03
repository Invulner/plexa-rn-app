import types from '../types/locations'

const saveLocations = (locations) => ({
  type: types.SAVE_LOCATIONS,
  locations
})

const toggleLoading = (flag) => ({
  type: types.TOGGLE_LOADING,
  flag
})

const deleteLocations = () => ({
  type: types.DELETE_LOCATIONS
})

const saveLocationObj = (item) => ({
  type: types.SAVE_LOCATION_OBJ,
  item
})

const deleteLocationObj = () => ({
  type: types.DELETE_LOCATION_OBJ
})

export default {
  saveLocations,
  toggleLoading,
  deleteLocations,
  saveLocationObj,
  deleteLocationObj
}
