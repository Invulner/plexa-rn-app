import React from 'react'
import { createStackNavigator } from 'react-navigation'
import AppTabNavigator from './AppTabNavigator'
import HeaderLogo from '../components/common/header/HeaderLogo'
import HeaderLeft from '../components/common/header/HeaderLeft'

const AppStack = createStackNavigator({
  App: {
    screen: AppTabNavigator,
    navigationOptions: ({ navigation }) => ({
      headerTitle: <HeaderLogo navigation={navigation} />,
      headerLeft: HeaderLeft,
      headerStyle: {
        paddingVertical: 10
      }
    })
  }
})

export default AppStack
