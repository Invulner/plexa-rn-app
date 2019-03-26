import { createMaterialTopTabNavigator } from 'react-navigation'
import ProfileScreen from '../screens/ProfileScreen'
import ResearchFeedScreen from '../screens/ResearchFeedScreen'
import MessagesScreen from '../screens/MessagesScreen'
import CustomTabBar from '../components/tabBar/CustomTabBar'
import FeedScreen from '../screens/FeedScreen'
import AddGroupScreen from '../screens/AddGroupScreen';

const AppTabNavigator = createMaterialTopTabNavigator({
  Feed: AddGroupScreen,
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
