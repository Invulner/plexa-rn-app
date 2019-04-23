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
import Done from '../components/common/header/Done'
import AddLocationScreen from '../screens/AddLocationScreen'
import AddUsersScreen from '../screens/AddUsersScreen'

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
      headerTitle: <HeaderTitle title={'Privacy policy'} />
    })
  },
  Terms: {
    screen: TermsOfService,
    navigationOptions: () => ({
      headerTitle: <HeaderTitle title={'Terms of service'} />
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
      headerTitle: <HeaderTitle title={'Add link'} />,
      headerRight: <Done />
    })
  },
  AddGroup: {
    screen: AddGroupScreen,
    navigationOptions: () => ({
      headerTitle: <HeaderTitle title={'Select group'} />
    })
  },
  AddLocation: {
    screen: AddLocationScreen,
    navigationOptions: () => ({
      headerTitle: <HeaderTitle title={'Target location'} />
    })
  },
  AddUsers: {
    screen: AddUsersScreen,
    navigationOptions: () => ({
      headerTitle: <HeaderTitle title={'Add users'} />,
      headerRight: <Done />
    })
  },
}, {
  defaultNavigationOptions: {
    headerStyle: {
      paddingVertical: 10
    },
    headerLeft: <BackArrow />
  }
})

export default MainStack
