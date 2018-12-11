import { createSwitchNavigator } from 'react-navigation'
import AppLoadingScreen from '../screens/AppLoadingScreen'
import LoginScreen from '../screens/Auth/LoginScreen'

export const SwitchAppNavigator = createSwitchNavigator(
  {
    AppLoading: AppLoadingScreen,
    Auth: LoginScreen
  },
  {
    initialRouteName: 'AppLoading'
  }
)

export default SwitchAppNavigator
