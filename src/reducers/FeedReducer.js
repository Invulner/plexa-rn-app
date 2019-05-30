import types from '../types/feed'
import utils from '../utils'

const initialFilterState = {
  topic_ids: [],
  group_id: null,
  location_ids: []
}

const initialState = {
  feedData: [],
  feedLoading: true,
  filterVisible: false,
  filter: { ...initialFilterState }
}

const blockUser = (state, action) => {
  const newVal = { blocked: true }
  const newFeedData = state.feedData.map(item => {
    if (item.author.id === action.id)
      return { ...item, ...newVal }
    else
      return item
  })

  return {
    ...state,
    feedData: newFeedData
  }
}

const concealPost = (state, action, option) => {
  let newVals

  switch (option) {
    case 'hide':
      newVals = { hidden: true }
      break
    case 'report':
      newVals = { reported: true }
      break
    case 'delete':
      newVals = { deleted: true }
      break
    default:
      console.log('Wrong option or no option passed')
  }
  
  const newFeedData = utils.updateItemById(state.feedData, action.id, newVals)

  return {
    ...state,
    feedData: newFeedData
  }
}

const updateCommentsCounter = (state, action) => {
  const item = utils.findItemById(state.feedData, action.id)
  let counter
  if (action.counter === 'decrease') {
    counter = item.answers_count - 1
  } else if (action.counter === undefined) {
    counter = item.answers_count + 1
  } else {
    counter = action.counter
  }
  const newVal = { answers_count: counter }
  const newFeedData = utils.updateItemById(state.feedData, action.id, newVal)

  return {
    ...state,
    feedData: newFeedData
  }
}

const updatePostLike = (state, action) => {
  if (action.data) {
    const newVals = {
      liked: action.data.liked,
      likes_count: action.data.likes_count
    }
    const newFeedData = utils.updateItemById(state.feedData, action.id, newVals)

      return {
        ...state,
        feedData: newFeedData
      }
  } else {
    return state
  }
}

const updatePost = (state, action) => {
  const newFeedData = utils.updateItemById(state.feedData, action.post.id, action.post)

  return {
    ...state,
    feedData: newFeedData
  }
}

const filterFeature = (arr, itemId) => {
  if (arr.includes(itemId)) {
    return [...arr].filter(id => id !== itemId)
  } else {
    return [...arr, itemId]
  }
}

const toggleFilterItem = (state, action) => {
  const { feature, itemId } = action
  const { topic_ids, location_ids, group_id } = state.filter
  
  switch (feature) {
    case 'topics':
      return {
        ...state,
        filter: {
          ...state.filter,
          topic_ids: filterFeature(topic_ids, itemId)
        }
      }

    case 'group':
      if (group_id !== itemId) {
        return {
          ...state,
          filter: {
            ...state.filter,
            group_id: itemId
          }
        }
      } else {
        return {
          ...state,
          filter: {
            ...state.filter,
            group_id: null
          }
        }
      }

    case 'locations':  
      return {
        ...state,
        filter: {
          ...state.filter,
          location_ids: filterFeature(location_ids, itemId)
        }
      }
  }
}

const FeedReducer = (state = initialState, action) => {
  switch(action.type) {
    case types.SAVE_FEED_DATA:
      return {
        ...state,
        feedData: [
          ...state.feedData,
          ...action.feedData
        ]
      }

    case types.TOGGLE_FEED_DATA_LOADING:
      return {
        ...state,
        feedLoading: action.flag
      }

    case types.UPDATE_FEED_PAGE:
      return {
        ...state,
        page: action.page
      }

    case types.REFRESH_FEED:
      return {
        ...state,
        feedData: action.refreshedFeedData
      }

    case types.SAVE_COMPOSED_POST:
      return {
        ...state,
        feedData: [
          action.post,
          ...state.feedData
        ]
      }

    case types.RESET_FEED:
      return initialState

    case types.UPDATE_POST_LIKE:
      return updatePostLike(state, action)

    case types.UPDATE_COMMENTS_COUNTER:
      return updateCommentsCounter(state, action)

    case types.HIDE_POST:
      return concealPost(state, action, 'hide')

    case types.REPORT_POST:
      return concealPost(state, action, 'report')

    case types.BLOCK_USER:
      return blockUser(state, action)

    case types.DELETE_POST:
      return concealPost(state, action, 'delete')

    case types.UPDATE_POST:
      return updatePost(state, action)

    case types.TOGGLE_FILTER:
      return {
        ...state,
        filterVisible: !state.filterVisible
      }

    case types.TOGGLE_FILTER_ITEM:
      return toggleFilterItem(state, action)

    case types.CLEAR_FILTER:

      return {
        ...state,
        filter: initialFilterState
      }

    default:
      return state
  }
}

export default FeedReducer
