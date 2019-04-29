import { createSelector } from 'reselect'
import utils from '../utils'

export const getChatMessages = createSelector(
  state => state.user.full_name,
  state => state.chat.messages,
  (userName, messages) => {
    const isUser = (item) => {
      return item.author.name === userName
    }

    const isDateItem = (item) => {
      return !!item.date
    }

    const newArr = messages.reduce((acc, item, index, arr) => {
      const nextItem = arr[index + 1]

      if (nextItem && !utils.compareDates(item.created_at, nextItem.created_at)) {
        const newDateItem = { date: item.created_at }
        acc.push(item)
        acc.push(newDateItem)
      } else 
        acc.push(item)
      
      return acc
    }, [])

    const data = newArr.map((item, index, array) => {
      const nextItem = array[index + 1]

      if (isDateItem(item)) {
        return item
      }
      else if (nextItem && !isDateItem(nextItem) && item.author.name === nextItem.author.name){
        return isUser(item) ? { ...item, isUser: true, isNextMessage: true } : { ...item, isNextMessage: true }
      }
      else {
        return isUser(item) ? { ...item, isUser: true } : item
      }
    })

    return data
  }
)
