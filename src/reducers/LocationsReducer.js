import types from '../types/locations'

const initialState = {
  items: [],
  loading: true
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

    default:
      return state
  }
}

export default LocationReducer
