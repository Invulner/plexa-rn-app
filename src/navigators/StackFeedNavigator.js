import React from 'react'
import { createStackNavigator } from 'react-navigation'
import FeedScreen from '../screens/FeedScreen'
import FeedHeaderLogo from '../components/feed/feedHeader/FeedHeaderLogo'
import FeedHeaderRight from '../components/feed/feedHeader/FeedHeaderRight'
import FeedHeaderLeft from '../components/feed/feedHeader/FeedHeaderLeft'


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
  }
})

export default FeedStack
