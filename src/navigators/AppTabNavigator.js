import { createMaterialTopTabNavigator } from 'react-navigation'
import FeedStack from './StackFeedNavigator'
import ProfileScreen from '../screens/ProfileScreen'
import ResearchFeedScreen from '../screens/ResearchFeedScreen'
import MessagesScreen from '../screens/MessagesScreen'
import CustomTabBar from '../components/tabBar/CustomTabBar'

const AppTabNavigator = createMaterialTopTabNavigator({
  Feed: FeedStack,
  ResearchFeed: ResearchFeedScreen,
  Messages: MessagesScreen,
  Profile: ProfileScreen,
}, {
  tabBarOptions: {
    showLabel: false
  },
  tabBarPosition: 'bottom',
  tabBarComponent: CustomTabBar
})

export default AppTabNavigator
