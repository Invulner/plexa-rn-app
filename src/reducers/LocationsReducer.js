import types from '../types/locations'

const initialState = {
  items: [],
  loading: false,
  savedLocation: null
}

const LocationReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SAVE_LOCATIONS:
      return {
        ...state,
        items: action.locations
      }

    case types.TOGGLE_LOADING:
      return {
        ...state,
        loading: action.flag
      }

    case types.RESET_LOCATIONS:
      return {
        ...state,
        items: initialState.items
      }

    case types.SAVE_LOCATION_OBJ:
      return {
        ...state,
        savedLocation: action.item
      }

    case types.DELETE_LOCATION_OBJ:
      return {
        ...state,
        savedLocation: initialState.savedLocation
      }

    default:
      return state
  }
}

export default LocationReducer
