import { createSwitchNavigator } from 'react-navigation'
import AppLoadingScreen from '../screens/AppLoadingScreen'
import StackTermsNavigator from './StackTemsNavigator'

const SwitchAppNavigator = createSwitchNavigator(
  {
    AppLoading: AppLoadingScreen,
    App: StackTermsNavigator
  },
  {
    initialRouteName: 'AppLoading'
  }
)

export default SwitchAppNavigator
