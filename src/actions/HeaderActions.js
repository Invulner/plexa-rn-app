import types from '../types/header'

const toggleBackArrow = (flag) => ({
  type: types.TOGGLE_BACK_ARROW,
  flag
})

export default {
  toggleBackArrow
}
