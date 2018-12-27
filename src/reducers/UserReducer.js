import types from '../types/user'

const initialState = {
  id: '',
  email: '',
  provider: '',
  customer_id: '',
  loading: false,
  avatar_url: '',
  conditions: [],
  date_of_birth: '',
  followers_count: 0,
  following: false,
  full_name: '',
  groups: [],
  id: null,
  interests: [],
  isConsumer: false,
  isProfessional: false,
  languages: [],
  location: [],
  role: '',
  specialities: [],
  sub_specialities: [],
  time_zone: '',
  title: '',
  topic_node_ids: [],
  workplaces: []
}

const userReducer = (state = initialState, action) => {
  switch(action.type) {
    case types.SAVE_USER_DATA:
      return {...state, ...action.userData}
    case types.TOGGLE_USER_DATA_LOADING:
      return {...state, loading: action.flag}
    default:
      return state
  }
}

export default userReducer
