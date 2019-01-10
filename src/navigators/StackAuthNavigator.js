import { createStackNavigator } from 'react-navigation'
import LoginScreen from '../screens/Auth/LoginScreen'
import PrivacyPolicy from '../screens/Auth/PrivacyPolicy'
import TermsOfService from '../screens/Auth/TermsOfService'

const AuthStack = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: () => ({
      headerBackTitle: null
    })
  },
  Policy: PrivacyPolicy,
  Terms: TermsOfService
},
{
  initialRouteName: 'Login'
})

export default AuthStack
