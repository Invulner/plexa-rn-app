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

export default {
  saveLinkUrl,
  saveTopicIDs,
  saveContent
}
