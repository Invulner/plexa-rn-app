import types from '../types/post'

const initialState = {
  link_url: ''
}

const PostReducer = (state = initialState, action) => {
  switch(action.type) {
    case types.SAVE_LINK_URL:
      return {...state, link_url: action.link}
    default: 
      return state
  }
}

export default PostReducer
