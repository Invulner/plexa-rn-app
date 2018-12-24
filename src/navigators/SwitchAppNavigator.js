import { createSwitchNavigator } from 'react-navigation'
import AppLoadingScreen from '../screens/AppLoadingScreen'
import LoginScreen from '../screens/Auth/LoginScreen'
import FeedScreen from '../screens/FeedScreen'

export const SwitchAppNavigator = createSwitchNavigator(
  {
    AppLoading: AppLoadingScreen,
    Auth: LoginScreen,
    Feed: FeedScreen
  },
  {
    initialRouteName: 'AppLoading'
  }
)

export default SwitchAppNavigator
