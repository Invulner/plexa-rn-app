import types from '../types/post'

const saveLink = (link) => ({
  type: types.SAVE_LINK,
  link
})

const toggleTopic = (id) => ({
  type: types.TOGGLE_TOPIC,
  id
})

const saveContent = (content) => ({
  type: types.SAVE_CONTENT,
  content
})

const toggleComments = (flag) => ({
  type: types.TOGGLE_COMMENTS,
  flag
})

const togglePrivacy = (flag) => ({
  type: types.TOGGLE_PRIVACY,
  flag
})

const resetPost = () => ({
  type: types.RESET_POST
})

const saveGroup = (id) => ({
  type: types.SAVE_GROUP,
  id
})

const deleteGroup = () => ({
  type: types.DELETE_GROUP
})

const saveLocationID = (id) => ({
  type: types.SAVE_LOCATION_ID,
  id
})

const deleteLocationID = () => ({
  type: types.DELETE_LOCATION_ID
})

export default {
  saveLink,
  toggleTopic,
  saveContent,
  toggleComments,
  togglePrivacy,
  resetPost,
  saveGroup,
  deleteGroup,
  saveLocationID,
  deleteLocationID
}
