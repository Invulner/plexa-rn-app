import types from '../types/post'

const initialState = {
  link_url: '',
  topic_ids: [],
  content: '',
  comments_enabled: true,
  public: true,
  group_id: '',
  location_id: null
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

    case types.TOGGLE_PRIVACY:
      return {
        ...state,
        public: action.flag
      }

    case types.SAVE_GROUP:
      return {
        ...state,
        group_id: action.id
      }

    case types.DELETE_GROUP:
      return {
        ...state,
        group_id: initialState.group_id
      }

    case types.SAVE_LOCATION:
      return {
        ...state,
        location_id: action.id
      }

    case types.DELETE_LOCATION:
      return {
        ...state,
        location_id: initialState.location_id
      }

    case types.RESET_POST:
      return initialState

    default:
      return state
  }
}

export default PostReducer
