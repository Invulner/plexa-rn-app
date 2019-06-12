import { createMaterialTopTabNavigator } from 'react-navigation'
import ProfileScreen from '../screens/ProfileScreen'
import ResearchFeedScreen from '../screens/ResearchFeedScreen'
import ChatsScreen from '../screens/ChatsScreen'
import CustomTabBar from '../components/tabBar/CustomTabBar'
import FeedScreen from '../screens/FeedScreen'

const AppTabNavigator = createMaterialTopTabNavigator({
  Feed: FeedScreen,
  ResearchFeed: ResearchFeedScreen,
  Chats: ChatsScreen,
  Profile: ProfileScreen,
}, {
  tabBarOptions: {
    showLabel: false
  },
  tabBarPosition: 'bottom',
  tabBarComponent: CustomTabBar,
  swipeEnabled: false
  //Left here for the next task
  // animationEnabled: false,
  // transitionConfig: () => ({
  //   transitionSpec: {
  //     duration: 0,
  //   }
  // })
})

export default AppTabNavigator
