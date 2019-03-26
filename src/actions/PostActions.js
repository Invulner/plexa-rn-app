import types from '../types/post'

const saveLinkUrl = (link) => ({
  type: types.SAVE_LINK_URL,
  link
})

const saveTopicIDs = (id) => ({
  type: types.SAVE_TOPIC_IDS,
  id
})

const saveContent = (content) => ({
  type: types.SAVE_CONTENT,
  content
})

const clearLink = () => ({
  type: types.SAVE_LINK_URL
})

const toggleComments = (flag) => ({
  type: types.TOGGLE_COMMENTS,
  flag
})

const toggleVisibility = (flag) => ({
  type: types.TOGGLE_VISIBILITY,
  flag
})

export default {
  saveLinkUrl,
  saveTopicIDs,
  saveContent,
  clearLink,
  toggleComments,
  toggleVisibility
}
