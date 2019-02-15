import { createSwitchNavigator } from 'react-navigation'
import AppDrawerNavigator from './AppDrawerNavigator'
import LoginScreen from '../screens/auth/LoginScreen'

const SwitchMainNavigator = createSwitchNavigator({
  App: AppDrawerNavigator,
  Auth: LoginScreen
})

export default SwitchMainNavigator
