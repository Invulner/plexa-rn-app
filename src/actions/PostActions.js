import types from '../types/post'

const saveLink = (link) => ({
  type: types.SAVE_LINK,
  link
})

const clearLink = () => ({
  type: types.CLEAR_LINK
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

export default {
  saveLink,
  toggleTopic,
  saveContent,
  clearLink,
  toggleComments,
  togglePrivacy,
  resetPost
}
