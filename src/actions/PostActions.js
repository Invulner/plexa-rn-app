import types from '../types/post'

const saveLinkUrl = (link) => ({
  type: types.SAVE_LINK_URL,
  link
})

const saveParam = (param) => ({
  type: types.SAVE_PARAM,
  param
})

const saveTopicIDs = (id) => ({
  type: types.SAVE_TOPIC_IDS,
  id
})

export default {
  saveLinkUrl,
  saveParam,
  saveTopicIDs
}
