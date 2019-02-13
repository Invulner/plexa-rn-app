import React from 'react'
import { createStackNavigator } from 'react-navigation'
import LoginScreen from '../screens/auth/LoginScreen'
import PrivacyPolicy from '../screens/terms/PrivacyPolicy'
import TermsOfService from '../screens/terms/TermsOfService'
import { BRAND_DARK } from '../assets/styles/colors'
import BackArrow from '../components/common/BackArrow'
import HeaderTitle from '../components/common/HeaderTitle'

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
      headerTitle: <HeaderTitle title={'Privacy Policy'} />,
      headerLeft: <BackArrow />
    })
  },
  Terms: {
    screen: TermsOfService,
    navigationOptions: () => ({
      headerTitle: <HeaderTitle title={'Terms of Service'} />,
      headerLeft: <BackArrow />
    })
  }
},
{
  initialRouteName: 'Login',
  defaultNavigationOptions: {
    headerTintColor: BRAND_DARK,
    headerBackTitle: null,
    headerTitleStyle: {
      fontWeight: '400',
    },
  }
})

export default AuthStack
