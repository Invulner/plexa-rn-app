import { createSelector } from 'reselect'
import utils from '../utils'

export const getSortedPosts = createSelector(
  state => state.feed.feedData,
  (data) => data.sort(utils.sortReversed)
)
