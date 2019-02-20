import { createStackNavigator } from 'react-navigation'
import AppTabNavigator from './AppTabNavigator'
import FeedHeaderLogo from '../components/feed/feedHeader/FeedHeaderLogo'

const AppStack = createStackNavigator({
  App: {
    screen: AppTabNavigator,
    navigationOptions: () => ({
      headerTitle: FeedHeaderLogo,
      headerStyle: {
        paddingVertical: 10
      }
    })
  }
})

export default AppStack
