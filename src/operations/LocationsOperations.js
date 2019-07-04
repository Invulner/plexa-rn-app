import LocationsActions from '../actions/LocationsActions'
import PostActions from '../actions/PostActions'
import getAxiosInstance from '../config/axios'

const getLocations = (q) => {
  return dispatch => {
    dispatch(LocationsActions.toggleLoading(true))

    return getAxiosInstance().then(api => {
      api.get(`/locations/search?term=${q}`)
        .then(response => {
          dispatch(LocationsActions.saveLocations(response.data))
          dispatch(LocationsActions.toggleLoading(false))
        }).catch(error => console.log('GET LOCATIONS ERROR', error))
    })
  }
}

const deleteLocation = () => {
  return dispatch => {
    dispatch(PostActions.deleteLocation())
    dispatch(LocationsActions.deleteLocationObj())
  }
}

const saveLocation = (obj) => {
  return dispatch => {
    dispatch(PostActions.saveLocation(obj.id))
    dispatch(LocationsActions.saveLocationObj(obj))
  }
}

export default {
  getLocations,
  deleteLocation,
  saveLocation
}
