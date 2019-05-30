import { createSelector } from 'reselect'
import utils from '../utils'

export const getSortedGroups = createSelector(
  state => state.user.groups,
  state => state.user.loading,
  (groups, loading) => loading ? [] : groups.sort(utils.sortByField('name'))
)
