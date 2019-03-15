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

const sortByTime = (a, b) => {
  const date1 = new Date(a.created_at)
  const date2 = new Date(b.created_at)

  return (date1.getTime() - date2.getTime()) < 0 ? -1 : 1
}

const updateObject = (prevState, newVals) => {
  return Object.assign({}, prevState, newVals)
}

const updateItemById = (arr, id, cb) => {
  const newArr = arr.map(item => {
    if (item.id !== id)
      return item

    const newItem = cb(item)
    return newItem
  })

  return newArr
}

export default {
  getInitials,
  truncate,
  renderProfileDetails,
  getDescription,
  sortByTime,
  updateObject,
  updateItemById
}
