import { createSelector } from 'reselect'
import utils from '../utils'

export const getChatMessages = createSelector(
  state => state.user.full_name,
  state => state.chat.messages,
  (userName, messages) => {
    const isUser = (item) => {
      return item.author.name === userName
    }

    let data = messages.map((item, index, array) => {
      if (index >= 1 && item.author.name === array[index - 1].author.name){
        return isUser(item) ? { ...item, isUser: true, isNextMessage: true } : { ...item, isNextMessage: true }
      }
      else
        return isUser(item) ? { ...item, isUser: true } : item
    })
  
    return data
  }
)
