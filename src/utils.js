import { MAX_CONTENT_LENGTH } from './constants'

const getInitials = (name) => {
  let initials = name.toUpperCase().split(/\s/).reduce((acc, cur) => acc += cur.slice(0,1), '')
  return initials
}

const truncate = (text, maxLength = MAX_CONTENT_LENGTH) => {
 return text.length > maxLength ? text.slice(0, maxLength) + ' ...' : text
}

const renderProfileDetails = (details) => {

  return  details.map((item, index) => {
    if (index !== details.length - 1)
      return `${item.keyword}, `
    else 
      return `${item.keyword}`
  })
}

const getDescription = (description, fullView) => {
  return fullView ? description : truncate(description)
}

export default {
  getInitials,
  truncate,
  renderProfileDetails,
  getDescription
}
