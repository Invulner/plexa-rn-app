import { createSwitchNavigator } from 'react-navigation'
import LoginScreen from '../screens/auth/LoginScreen'
import AppStack from './AppStackNavigator'

const SwitchMainNavigator = createSwitchNavigator({
  App: AppStack,
  Auth: LoginScreen
})

export default SwitchMainNavigator
