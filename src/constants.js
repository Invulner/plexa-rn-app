export const BASE_URL = 'https://staging.plexa.ai'
export const SIGN_UP_URL = `${BASE_URL}/sign_up`
export const PASSWORD_URL = `${BASE_URL}/u/password/new`
export const API_URL = `${BASE_URL}/api/v1`
export const MIN_PASSWORD_LENGTH = 8
export const MAX_CONTENT_LENGTH = 250
export const MESSAGES_IN_PAGE = 20
export const UNAUTHORIZED_STATUS_CODE = 401
export const menuIcons = {
  'plexa': require('./assets/icons/logo-min-01.png'),
  'groups': require('./assets/icons/user-groups-01.png'),
  'speciality': require('./assets/icons/specialties.png'),
  'location': require('./assets/icons/location-01.png')
}

export const tabIcons = {
  'feed-active': require('./assets/icons/feed.png'),
  'research-active': require('./assets/icons/research.png'),
  'messages-active': require('./assets/icons/envelope-icon-white.png'),
  'profile-active': require('./assets/icons/profile.png'),
  'feed': require('./assets/icons/feed-inactive.png'),
  'research': require('./assets/icons/research-inactive.png'),
  'messages': require('./assets/icons/message-inactive.png'),
  'profile': require('./assets/icons/profile-inactive.png')
}

export const likeIcons = {
  liked: require('./assets/icons/like-icon-liked.png'),
  unliked: require('./assets/icons/like-icon.png')
}

export const hints = {
  replies: {
    title: 'Replies',
    text: 'When enabled, other users are able to reply to your post. These replies are visible to others.'
  },
  privacy: {
    title: 'Privacy',
    text: 'When enabled your post will only show to other health providers. Disable to post also to patients.'
  }
}

export const postIcons = {
  'link-active': require('./assets/icons/link-active.png'),
  link: require('./assets/icons/link.png'),
  'photo-active': require('./assets/icons/photo-upload-active.png'),
  photo: require('./assets/icons/photo-upload.png'),
  'location-active': require('./assets/icons/location-active.png'),
  location: require('./assets/icons/location.png'),
  'users-active': require('./assets/icons/users-group-active.png'),
  users: require('./assets/icons/users-group.png')
}
