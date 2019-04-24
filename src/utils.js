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

const sortByTime = (timeField) => {
  return (a, b) => {
    const date1 = new Date(a[timeField]).getTime()
    const date2 = new Date(b[timeField]).getTime()

    if (date1 === date2)
      return 0
    else
      return date1 < date2 ? -1 : 1
  }
}

const updateItemById = (arr, id, newVals) => {
  const index = arr.findIndex(item => item.id === id)
  const newItem = { ...arr[index], ...newVals }
  return [
    ...arr.slice(0, index),
    newItem,
    ...arr.slice(index + 1)
  ]
}

const findItemById = (arr, id) => {
  return arr.find(item => item.id === id)
}

const sortByField = (field) => {
  return (a, b) => {
    const valA = a[field].toLowerCase()
    const valB = b[field].toLowerCase()

    return  valA == valB ? 0 : valA < valB ? -1 : 1
  }
}

const getLocation = (location) => {
  const country = location.find(item => item.kind === 'country').name
  const city = location.find(item => item.kind === 'city').name
  const locationString = `${city}, ${country}`

  return truncate(locationString, 20)
}

const getMedicalPractice = (user) => {
  const { specialities, sub_specialities, conditions, interests } = user
  const allPractice = [
    {
      title: 'Speciality',
      list: specialities
    },
    {
      title: 'Sub-speciality',
      list: sub_specialities
    },
    {
      title: 'Conditions of interest',
      list: conditions
    },
    {
      title: 'Areas of interest',
      list: interests
    }
  ]

  return allPractice.filter(obj => obj.list && obj.list.length)
}

const formatDate = (dateArg) => {
  const date = new Date(dateArg)
  const day = date.getDate()
  const month = date.toString().slice(4, 7)

  return `${day} ${month}`
}

const formatChatDate = (dateArg) => {
  const date = new Date(dateArg)
  const unixDay = 86400000

  if (Date.now() - date.getTime() <= unixDay)
    return 'Today'
  else if (Date.now() - date.getTime() <= 2 * unixDay)
    return 'Yesterday'
  else 
    return formatDate(date)  
}


export default {
  getInitials,
  truncate,
  renderProfileDetails,
  getDescription,
  sortByTime,
  updateItemById,
  findItemById,
  sortByField,
  getLocation,
  getMedicalPractice,
  formatDate,
  formatChatDate
}
