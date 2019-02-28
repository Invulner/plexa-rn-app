import { createStackNavigator } from 'react-navigation'
import AppTabNavigator from './AppTabNavigator'
import HeaderLogo from '../components/common/header/HeaderLogo'

const AppStack = createStackNavigator({
  App: {
    screen: AppTabNavigator,
    navigationOptions: () => ({
      headerTitle: HeaderLogo,
      headerStyle: {
        paddingVertical: 10
      }
    })
  }
})

export default AppStack
