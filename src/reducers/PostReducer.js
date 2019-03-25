import types from '../types/post'

const initialState = {
  link_url: '',
  topic_ids: [],
  content: ''
}

const getTopicIDs = (state, action) => {
  if (state.topic_ids.includes(action.id)) 
    return {
      ...state,
      topic_ids: state.topic_ids.filter(id => id !== action.id)
    }
  else 
    return {
      ...state,
      topic_ids: [...state.topic_ids, action.id]
    }
}

const PostReducer = (state = initialState, action) => {
  switch(action.type) {
    case types.SAVE_LINK_URL:
      return {...state, link_url: action.link}

    case types.SAVE_TOPIC_IDS: 
      return getTopicIDs(state, action)

    case types.SAVE_PARAM:
      return {
        ...state, 
        ...action.param
      }

    default: 
      return state
  }
}

export default PostReducer
