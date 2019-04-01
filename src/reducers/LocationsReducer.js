import types from '../types/locations'

const initialState = {}

const LocationReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SAVE_LOCATIONS:
      return {
        ...state,
        items: action.locations
      }

    default:
      return state
  }
}

export default LocationReducer
