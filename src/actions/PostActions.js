import types from '../types/post'

const saveLink = (link, news_id = null) => ({
  type: types.SAVE_LINK,
  link,
  news_id
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

const saveLocation = (id) => ({
  type: types.SAVE_LOCATION,
  id
})

const deleteLocation = () => ({
  type: types.DELETE_LOCATION
})

const savePostToModify = (post) => ({
  type: types.SAVE_POST_TO_MODIFY,
  post
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
  saveLocation,
  deleteLocation,
  savePostToModify
}
