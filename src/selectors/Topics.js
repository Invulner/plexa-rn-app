import { createSelector } from 'reselect'
import utils from '../utils'

export const getSortedTopics = createSelector(
  state => state.user.specialities,
  state => state.user.sub_specialities,
  state => state.user.conditions,
  state => state.user.interests,
  state => state.user.loading,
  (specialities, sub_specialities, conditions, interests, loading) => {
    if (loading) {
      return []
    } else {
      const allTopics = [...specialities, ...sub_specialities, ...conditions, ...interests]

      return allTopics.sort(utils.sortByField('keyword'))
    }
  }
)
