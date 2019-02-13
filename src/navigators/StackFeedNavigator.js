import React from 'react'
import { createStackNavigator } from 'react-navigation'
import FeedScreen from '../screens/FeedScreen'
import FeedHeaderLogo from '../components/feed/feedHeader/FeedHeaderLogo'
import FeedHeaderRight from '../components/feed/feedHeader/FeedHeaderRight'
import FeedHeaderLeft from '../components/feed/feedHeader/FeedHeaderLeft'
import OwnProfileScreen from '../screens/OwnProfileScreen'
import BackArrow from '../components/common/BackArrow'
import HeaderTitle from '../components/common/HeaderTitle'
import PrivacyPolicy from '../screens/terms/PrivacyPolicy'
import TermsOfService from '../screens/terms/TermsOfService'
import UserProfileScreen from '../screens/UserProfileScreen'

const FeedStack = createStackNavigator({
  Feed: {
    screen: FeedScreen,
    navigationOptions: () => ({
      headerTitle: <FeedHeaderLogo />,
      headerRight: <FeedHeaderRight />,
      headerLeft: <FeedHeaderLeft />,
      headerStyle: {
        paddingVertical: 10
      }
    })
  },
  OwnProfile: {
    screen: OwnProfileScreen,
    navigationOptions: () => ({
      headerTitle: <HeaderTitle title={'My profile'} />,
      headerLeft: <BackArrow />,
      headerStyle: {
        paddingVertical: 10
      }
    })
  },
  UserProfile: {
    screen: UserProfileScreen,
    navigationOptions: () => ({
      headerTitle: <HeaderTitle title={'User profile'} />,
      headerLeft: <BackArrow />,
      headerStyle: {
        paddingVertical: 10
      }
    })
  },
  ProfilePolicy: {
    screen: PrivacyPolicy,
    navigationOptions: () => ({
      headerTitle: <HeaderTitle title={'Privacy Policy'} />,
      headerLeft: <BackArrow />,
      headerStyle: {
        paddingVertical: 10
      }
    })
  },
  ProfileTerms: {
    screen: TermsOfService,
    navigationOptions: () => ({
      headerTitle: <HeaderTitle title={'Terms of Service'} />,
      headerLeft: <BackArrow />,
      headerStyle: {
        paddingVertical: 10
      }
    })
  }
})

export default FeedStack
