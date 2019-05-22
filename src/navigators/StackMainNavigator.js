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
import DoneBtn from '../components/common/header/DoneBtn'
import AddLocationScreen from '../screens/AddLocationScreen'
import AddUsersScreen from '../screens/AddUsersScreen'
import ChatScreen from '../screens/ChatScreen'

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
    navigationOptions: ({ navigation }) => ({
      headerTitle: <HeaderLogo navigation={navigation} />
    })
  },
  Post: {
    screen: PostScreen,
    navigationOptions: ({ navigation }) => ({
      headerTitle: <HeaderLogo navigation={navigation} />
    })
  },
  Compose: {
    screen: ComposeScreen,
    navigationOptions: ({ navigation }) => ({
      headerTitle: <HeaderTitle title={'New post'} />,
      headerRight: <DoneBtn btnText='Post' navigation={navigation} />
    })
  },
  AddLink: {
    screen: AddLinkScreen,
    navigationOptions: ({ navigation }) => ({
      headerTitle: <HeaderTitle title={'Add link'} />,
      headerRight: <DoneBtn btnText='Done' navigation={navigation} />
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
    navigationOptions: ({ navigation }) => ({
      headerTitle: <HeaderTitle title={'Add users'} />,
      headerRight: <DoneBtn btnText='Done' navigation={navigation} />
    })
  },
  Chat: {
    screen: ChatScreen,
    navigationOptions: ({ navigation }) => ({
      headerTitle: <HeaderTitle title={navigation.getParam('chatTitle')} />
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
