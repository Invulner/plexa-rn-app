import React from 'react'
import { createStackNavigator } from 'react-navigation'
import AppTabNavigator from './AppTabNavigator'
import HeaderLogo from '../components/common/header/HeaderLogo'
import HeaderLeft from '../components/common/header/HeaderLeft'
import HeaderRight from '../components/common/header/HeaderRight'

const AppStack = createStackNavigator({
  App: {
    screen: AppTabNavigator,
    navigationOptions: () => ({
      headerTitle: <HeaderLogo />,
      headerLeft: <HeaderLeft />,
      headerRight: <HeaderRight />,
      headerStyle: {
        paddingVertical: 10
      }
    })
  }
})

export default AppStack
