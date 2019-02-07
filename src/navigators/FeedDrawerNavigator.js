import CustomDrawerComponent from '../components/feed/drawer/CustomDrawerComponent'
import { createDrawerNavigator } from 'react-navigation'
import FeedStack from './StackFeedNavigator'

const FeedDrawerNavigator = createDrawerNavigator({
  Feed: {
    screen: FeedStack,
  }
}, {
  contentComponent: CustomDrawerComponent
})

export default FeedDrawerNavigator
