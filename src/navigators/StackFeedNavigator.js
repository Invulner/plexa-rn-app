import { createStackNavigator } from 'react-navigation'
import FeedScreen from '../screens/FeedScreen'
import PublicProfileScreen from '../screens/PublicProfileScreen'

const FeedStack = createStackNavigator({
  Feed: {
    screen: FeedScreen,
    navigationOptions: () => ({
      header: null
    })
  },
  PublicProfile: {
    screen: PublicProfileScreen,
    navigationOptions: () => ({
      header: null
    })
  }
})

export default FeedStack
