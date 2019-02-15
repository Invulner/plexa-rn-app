import React from 'react'
import { createStackNavigator } from 'react-navigation'
import FeedScreen from '../screens/FeedScreen'
import FeedHeaderLogo from '../components/feed/feedHeader/FeedHeaderLogo'
import FeedHeaderRight from '../components/feed/feedHeader/FeedHeaderRight'
import FeedHeaderLeft from '../components/feed/feedHeader/FeedHeaderLeft'
import ProfileScreen from '../screens/ProfileScreen'
import BackArrow from '../components/common/header/BackArrow'
import HeaderTitle from '../components/common/header/HeaderTitle'
import PublicProfileScreen from '../screens/PublicProfileScreen'

const FeedStack = createStackNavigator({
  Feed: {
    screen: FeedScreen,
    navigationOptions: () => ({
      headerTitle: <FeedHeaderLogo />,
      headerRight: <FeedHeaderRight />,
      headerLeft: <FeedHeaderLeft />
    })
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: () => ({
      headerTitle: <HeaderTitle title={'My profile'} />
    })
  },
  PublicProfile: {
    screen: PublicProfileScreen,
    navigationOptions: () => ({
      headerTitle: <HeaderTitle title={'User profile'} />
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

export default FeedStack
