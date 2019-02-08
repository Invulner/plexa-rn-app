import { createSwitchNavigator } from 'react-navigation'
import AppLoadingScreen from '../screens/AppLoadingScreen'
import AuthStack from './StackAuthNavigator'
import AppDrawerNavigator from './AppDrawerNavigator'

const SwitchAppNavigator = createSwitchNavigator(
  {
    AppLoading: AppLoadingScreen,
    Auth: AuthStack,
    App: AppDrawerNavigator
  },
  {
    initialRouteName: 'AppLoading'
  }
)

export default SwitchAppNavigator
