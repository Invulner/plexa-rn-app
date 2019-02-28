import types from '../types/header'

const initialState = {
  isBackArrow: false
}

const HeaderReducer = (state = initialState, action) => {
  switch(action.type) {
    case types.TOGGLE_BACK_ARROW:
      return {isBackArrow: action.flag}
    default:
      return state
  }
}

export default HeaderReducer
