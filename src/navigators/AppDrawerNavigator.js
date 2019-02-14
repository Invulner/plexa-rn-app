import CustomDrawerComponent from '../components/drawer/CustomDrawerComponent'
import { createDrawerNavigator } from 'react-navigation'
import FeedStack from './StackFeedNavigator'

const AppDrawerNavigator = createDrawerNavigator({
  Feed: FeedStack
}, {
  contentComponent: CustomDrawerComponent
})

export default AppDrawerNavigator
