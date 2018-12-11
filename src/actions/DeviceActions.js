import types from '../types/device'

const saveDeviceInfo = (data) => ({
  type: types.SAVE_DEVICE_INFO,
  data
})

export default {
  saveDeviceInfo
}
