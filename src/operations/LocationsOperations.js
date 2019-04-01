import LocationsActions from '../actions/LocationsActions'
import getAxiosInstance from '../config/axios'
import { API_URL } from '../constants'

const getLocations = (input) => {
  return dispatch => {

    return getAxiosInstance().then(api => {
      api.get(`${API_URL}/locations/search?term=${input}`)
        .then(response => dispatch(LocationsActions.saveLocations(response.data)))
        .catch(error => console.log('GET LOCATIONS ERROR', error))
    })
  }
}

export default {
  getLocations
}
