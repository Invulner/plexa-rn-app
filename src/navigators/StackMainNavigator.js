import React from 'react'
import { createStackNavigator } from 'react-navigation'
import SwitchMainNavigator from './SwitchMainNavigator'
import BackArrow from '../components/common/header/BackArrow'
import HeaderTitle from '../components/common/header/HeaderTitle'
import PrivacyPolicy from '../screens/terms/PrivacyPolicy'
import TermsOfService from '../screens/terms/TermsOfService'
import HeaderLogo from '../components/common/header/HeaderLogo'
import PublicProfileScreen from '../screens/PublicProfileScreen'
import PostScreen from '../screens/PostScreen'
import ComposeScreen from '../screens/ComposeScreen'
import AddLinkScreen from '../screens/AddLinkScreen'
import AddGroupScreen from '../screens/AddGroupScreen'

const MainStack = createStackNavigator({
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
  },
  PublicProfile: {
    screen: PublicProfileScreen,
    navigationOptions: () => ({
      headerTitle: HeaderLogo
    })
  },
  Post: {
    screen: PostScreen,
    navigationOptions: () => ({
      headerTitle: HeaderLogo
    })
  },
  Compose: {
    screen: ComposeScreen,
    navigationOptions: () => ({
      headerTitle: <HeaderTitle title={'New post'} />
    })
  },
  AddLink: {
    screen: AddLinkScreen,
    navigationOptions: () => ({
      headerTitle: <HeaderTitle title={'Add Link'} />
    })
  },
  AddGroup: {
    screen: AddGroupScreen,
    navigationOptions: () => ({
      headerTitle: <HeaderTitle title={'Select group'} />
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

export default MainStack
