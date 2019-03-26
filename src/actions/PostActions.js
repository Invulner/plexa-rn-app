import types from '../types/post'

const saveLink = (link) => ({
  type: types.SAVE_LINK_URL,
  link
})

const clearLink = () => ({
  type: types.CLEAR_LINK_URL
})

const saveTopicIDs = (id) => ({
  type: types.SAVE_TOPIC_IDS,
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

const toggleVisibility = (flag) => ({
  type: types.TOGGLE_VISIBILITY,
  flag
})

const reset = () => ({
  type: types.RESET
})

export default {
  saveLink,
  saveTopicIDs,
  saveContent,
  clearLink,
  toggleComments,
  toggleVisibility,
  reset
}
