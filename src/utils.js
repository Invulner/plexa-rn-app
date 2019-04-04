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
  return arr.filter(item => item.id === id)[0]
}

const sortByField = (field) => {
  return (a, b) => {
    const valA = a[field].toLowerCase()
    const valB = b[field].toLowerCase()

    return  valA == valB ? 0 : valA < valB ? -1 : 1
  }
}

getLocation = (location) => {
  let locationArr = location.filter((item, index) => index !== 1).map(item => item.name)
  let locationString = `${locationArr[1]}, ${locationArr[0]}`

  return truncate(locationString, 20)
}

getMedicalPractice = (user) => {
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

  return  allPractice.filter(obj => obj.list && obj.list.length)
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
  getMedicalPractice
}
