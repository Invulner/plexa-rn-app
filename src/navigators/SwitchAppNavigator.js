import { createSwitchNavigator } from 'react-navigation'
import AppLoadingScreen from '../screens/AppLoadingScreen'
import MainStack from './StackMainNavigator'

const SwitchAppNavigator = createSwitchNavigator(
  {
    AppLoading: AppLoadingScreen,
    App: MainStack
  },
  {
    initialRouteName: 'AppLoading'
  }
)

export default SwitchAppNavigator
