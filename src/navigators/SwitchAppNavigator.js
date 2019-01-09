import { createSwitchNavigator } from 'react-navigation'
import AppLoadingScreen from '../screens/AppLoadingScreen'
import FeedScreen from '../screens/FeedScreen'
import AuthStack from './StackAuthNavigator'

const SwitchAppNavigator = createSwitchNavigator(
  {
    AppLoading: AppLoadingScreen,
    Auth: AuthStack,
    Feed: FeedScreen
  },
  {
    initialRouteName: 'AppLoading'
  }
)

export default SwitchAppNavigator
