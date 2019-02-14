import { createSwitchNavigator } from 'react-navigation'
import AppLoadingScreen from '../screens/AppLoadingScreen'
import StackAppNavigator from './StackAppNavigator'

const SwitchAppNavigator = createSwitchNavigator(
  {
    AppLoading: AppLoadingScreen,
    App: StackAppNavigator
  },
  {
    initialRouteName: 'AppLoading'
  }
)

export default SwitchAppNavigator
