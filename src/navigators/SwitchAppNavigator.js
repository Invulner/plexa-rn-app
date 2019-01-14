import { createSwitchNavigator } from 'react-navigation'
import AppLoadingScreen from '../screens/AppLoadingScreen'
import FeedStack from './StackFeedNavigator'
import AuthStack from './StackAuthNavigator'

const SwitchAppNavigator = createSwitchNavigator(
  {
    AppLoading: AppLoadingScreen,
    Auth: AuthStack,
    Feed: FeedStack
  },
  {
    initialRouteName: 'AppLoading'
  }
)

export default SwitchAppNavigator
