import React from 'react'
import { createStackNavigator } from 'react-navigation'
import SwitchMainNavigator from './SwitchMainNavigator'
import BackArrow from '../components/common/header/BackArrow'
import HeaderTitle from '../components/common/header/HeaderTitle'
import PrivacyPolicy from '../screens/terms/PrivacyPolicy'
import TermsOfService from '../screens/terms/TermsOfService'

const TermsStack = createStackNavigator({
  MainSwitch: {
    screen: SwitchMainNavigator,
    navigationOptions: () => ({
      headerBackTitle: null,
      header: null
    })
  },
  Policy: {
    screen: PrivacyPolicy,
    navigationOptions: () => ({
      headerTitle: <HeaderTitle title={'Privacy Policy'} />
    })
  },
  Terms: {
    screen: TermsOfService,
    navigationOptions: () => ({
      headerTitle: <HeaderTitle title={'Terms of Service'} />
    })
  }
}, {
  defaultNavigationOptions: {
    headerStyle: {
      paddingVertical: 10
    },
    headerLeft: <BackArrow />
  }
})

export default TermsStack
