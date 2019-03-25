import types from '../types/post'

const saveLinkUrl = (link) => ({
  type: types.SAVE_LINK_URL,
  link
})

export default {
  saveLinkUrl
}
