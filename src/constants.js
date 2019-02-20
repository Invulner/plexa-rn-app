export const BASE_URL = 'https://staging.plexa.ai'
export const SIGN_UP_URL = `${BASE_URL}/sign_up`
export const API_URL = `${BASE_URL}/api/v1`
export const MIN_PASSWORD_LENGTH = 8
export const MAX_CONTENT_LENGTH = 250
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

export const FeedPostComponentTypes = {
  standaloneScreen: 'standalone screen',
  partOfFeedScreen: 'part of Feed Screen'
}
