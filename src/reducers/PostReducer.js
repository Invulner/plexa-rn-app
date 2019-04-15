import types from '../types/post'

const initialState = {
  link_url: '',
  topic_ids: [],
  content: '',
  comments_enabled: true,
  public: false,
  group_id: '',
  location_id: null,
  news_id: null
}

const rewritePost = (state, action) => {
  const { link_url, topics, content, comments_enabled, public: isPublic, group, location, news_id } = action.post
  const topic_ids = topics.map(topic => topic.id)
  const location_id = location.find((item, index, array) => index === array.length - 1).id

  return {
    link_url,
    topic_ids,
    content,
    comments_enabled,
    public: isPublic,
    group_id: group.id,
    location_id,
    news_id
  }
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
        link_url: action.link,
        news_id: action.news_id
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
        public: !action.flag
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

    case types.REWRITE_POST:
      return rewritePost(state, action)

    default:
      return state
  }
}

export default PostReducer
