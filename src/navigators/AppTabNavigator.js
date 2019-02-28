import { createMaterialTopTabNavigator } from 'react-navigation'
import ProfileScreen from '../screens/ProfileScreen'
import ResearchFeedScreen from '../screens/ResearchFeedScreen'
import MessagesScreen from '../screens/MessagesScreen'
import CustomTabBar from '../components/tabBar/CustomTabBar'
import FeedScreen from '../screens/FeedScreen'

const AppTabNavigator = createMaterialTopTabNavigator({
  Feed: FeedScreen,
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
