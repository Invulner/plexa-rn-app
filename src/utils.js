import { MAX_CONTENT_LENGTH, UNAUTHORIZED_STATUS_CODE } from './constants'
import { Alert, NetInfo } from 'react-native'

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

const sortByTime = ({ field, order }) => {
  return (a, b) => {
    const date1 = new Date(a[field]).getTime()
    const date2 = new Date(b[field]).getTime()

    if (date1 === date2)
      return 0
    else if (order === 'desc')
      return date1 < date2 ? 1 : -1
    else if (order === 'asc')
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
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 
  'September', 'October', 'November', 'December']
  const fullDate = `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`
  const today = new Date()
  const yesterday = new Date()
  yesterday.setDate(today.getDate() - 1)
  const isDateToday = today.setHours(0,0,0,0) === date.setHours(0,0,0,0)
  const isDateYesterday = yesterday.setHours(0,0,0,0) == date.setHours(0,0,0,0)

  if (isDateToday)
    return 'Today'
  else if (isDateYesterday)
    return 'Yesterday'
  else 
    return fullDate 
}

const formatTime = (time) => {
  const date = new Date(time)
  const hours = date.getHours()
  let mins = date.getMinutes()
  mins = mins < 10 ? `0${mins}` : mins
  
  return `${hours}:${mins}`
}

const areDatesEqual = (a, b) => {
  const date1 = new Date(a)
  const date2 = new Date(b)

  return date1.setHours(0,0,0,0) === date2.setHours(0,0,0,0)
}

const isAuthorizedRequest = (errorStatusCode) => {
  return errorStatusCode !== UNAUTHORIZED_STATUS_CODE
}

const showConnectivityError = () => {
  Alert.alert('No internet connection')
}

const getRandomNumber = (min, max) => {
  let rand = min + Math.random() * (max + 1 - min)

  return  Math.floor(rand)
}

const basicSort = (a, b) => a < b ? -1 : 1

const startConnectionStatusWorker = () =>
  setInterval(async () => {
    await NetInfo.isConnected.fetch()
  }, 1000)

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
  formatChatDate,
  formatTime,
  areDatesEqual,
  isAuthorizedRequest,
  showConnectivityError,
  getRandomNumber,
  startConnectionStatusWorker,
  basicSort
}
