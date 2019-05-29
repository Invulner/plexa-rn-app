import React from 'react'
import { createStackNavigator } from 'react-navigation'
import AppTabNavigator from './AppTabNavigator'
import HeaderLogo from '../components/common/header/HeaderLogo'
import ComposeBtn from '../components/common/header/ComposeBtn'
import AppHeaderRight from '../components/common/header/AppHeaderRight'

const AppStack = createStackNavigator({
  App: {
    screen: AppTabNavigator,
    navigationOptions: ({ navigation }) => ({
      headerTitle: <HeaderLogo navigation={navigation} />,
      headerLeft: <ComposeBtn navigation={navigation} />,
      headerRight: <AppHeaderRight navigation={navigation} />,
      headerStyle: {
        paddingVertical: 10
      }
    })
  }
})

export default AppStack
