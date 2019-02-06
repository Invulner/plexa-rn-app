import { createSwitchNavigator } from 'react-navigation'
import AppLoadingScreen from '../screens/AppLoadingScreen'
import AuthStack from './StackAuthNavigator'
import FeedDrawerNavigator from './FeedDrawerNavigator'

const SwitchAppNavigator = createSwitchNavigator(
  {
    AppLoading: AppLoadingScreen,
    Auth: AuthStack,
    Feed: FeedDrawerNavigator
  },
  {
    initialRouteName: 'AppLoading'
  }
)

export default SwitchAppNavigator
