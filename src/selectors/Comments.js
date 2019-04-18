import { createSelector } from 'reselect'
import utils from '../utils'

export const getSortedComments = createSelector(
  state => state.comments.items,
  items => items.sort(utils.sortByTime('created_at'))
)
