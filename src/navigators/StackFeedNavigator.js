import React from 'react'
import { createStackNavigator } from 'react-navigation'
import FeedScreen from '../screens/FeedScreen'
import FeedHeaderLogo from '../components/feed/feedHeader/FeedHeaderLogo'
import FeedHeaderLeft from '../components/feed/feedHeader/FeedHeaderLeft'
import BackArrow from '../components/common/header/BackArrow'
import HeaderTitle from '../components/common/header/HeaderTitle'
import PublicProfileScreen from '../screens/PublicProfileScreen'

const FeedStack = createStackNavigator({
  Feed: {
    screen: FeedScreen,
    navigationOptions: () => ({
      headerTitle: <FeedHeaderLogo />,
      //headerLeft: <FeedHeaderLeft />
    })
  },
  PublicProfile: {
    screen: PublicProfileScreen,
    navigationOptions: () => ({
      headerTitle: <HeaderTitle title={'User profile'} />,
      headerLeft: <BackArrow />
    })
  }
}, {
  defaultNavigationOptions: {
    headerStyle: {
      paddingVertical: 10
    }
  }
})

export default FeedStack
