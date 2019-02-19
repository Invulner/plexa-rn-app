import { createSwitchNavigator } from 'react-navigation'
import LoginScreen from '../screens/auth/LoginScreen'
import AppTabNavigator from './AppTabNavigator'

const SwitchMainNavigator = createSwitchNavigator({
  App: AppTabNavigator,
  Auth: LoginScreen
})

export default SwitchMainNavigator
