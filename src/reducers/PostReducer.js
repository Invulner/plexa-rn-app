import types from '../types/post'

const initialState = {
  link_url: '',
  topic_ids: [],
  content: '',
  comments_enabled: true,
  public: true
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
    case types.SAVE_LINK:
      return {
        ...state, 
        link_url: action.link
      }

    case types.CLEAR_LINK:
      return {
        ...state, 
        link_url: ''
      }

    case types.TOGGLE_TOPIC: 
      return getTopicIDs(state, action)

    case types.SAVE_CONTENT: 
      return {
        ...state, 
        content: action.content
      }

    case types.TOGGLE_COMMENTS:
      return {
        ...state, 
        comments_enabled: action.flag
      }

    case types.TOGGLE_VISIBILITY: 
      return {
        ...state, 
        public: action.flag
      }

    case types.RESET: 
      return initialState

    default: 
      return state
  }
}

export default PostReducer
