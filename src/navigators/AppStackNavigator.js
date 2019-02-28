import React from 'react'
import { createStackNavigator } from 'react-navigation'
import AppTabNavigator from './AppTabNavigator'
import CustomHeader from '../components/common/header/CustomHeader'
import FeedHeaderLogo from '../components/feed/feedHeader/FeedHeaderLogo'

const AppStack = createStackNavigator({
  App: {
    screen: AppTabNavigator,
    navigationOptions: () => ({
      headerTitle: FeedHeaderLogo,
      headerStyle: {
        paddingVertical: 10
      }
      // header: props => <CustomHeader {...props} />
    })
  }
})

export default AppStack
