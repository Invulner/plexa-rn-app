import { createStackNavigator } from 'react-navigation'
import LoginScreen from '../screens/LoginScreen'
import PrivacyPolicy from '../screens/PrivacyPolicy'
import TermsOfService from '../screens/TermsOfService'
import { TEXT_COLOR } from '../assets/styles/colors'

const AuthStack = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: () => ({
      headerBackTitle: null,
      header: null
    })
  },
  Policy: { 
    screen: PrivacyPolicy,
    navigationOptions: () => ({
      title: 'Privacy Policy'
    })
  },
  Terms: {
    screen: TermsOfService,
    navigationOptions: () => ({
      title: 'Terms of Service'
    })
  }
},
{
  initialRouteName: 'Login',
  defaultNavigationOptions: {
    headerTintColor: TEXT_COLOR,
    headerBackTitle: null,
    headerTitleStyle: {
      fontWeight: '400',
    },
  }
})

export default AuthStack
