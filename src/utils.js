import { MAX_CONTENT_LENGTH } from './constants'

const getInitials = (name) => {
  let initials = name.toUpperCase().split(/\s/).reduce((acc, cur) => acc += cur.slice(0,1), '')
  return initials
}

const truncate = (text, textLength = MAX_CONTENT_LENGTH) => {
  let content = text
    if (content.length > textLength) {
      content = content.slice(0, textLength) + ' ...'
    }

    return content
}

export default {
  getInitials,
  truncate 
}
