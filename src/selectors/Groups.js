import { createSelector } from 'reselect'
import utils from '../utils'

export const getSortedGroups = createSelector(
  state => state.user.groups,
  groups => groups.sort(utils.sortByField('name'))
)
