import React from 'react'
import { createStackNavigator } from 'react-navigation'
import AppTabNavigator from './AppTabNavigator'
import ComposeBtn from '../components/common/header/ComposeBtn'
import AppHeaderRight from '../components/common/header/AppHeaderRight'
import HeaderTitle from '../components/common/header/HeaderTitle'

const AppStack = createStackNavigator({
  App: {
    screen: AppTabNavigator,
    navigationOptions: ({ navigation }) => ({
      headerTitle: <HeaderTitle navigation={navigation} />,
      headerLeft: <ComposeBtn navigation={navigation} />,
      headerRight: <AppHeaderRight navigation={navigation} />,
      headerStyle: {
        paddingVertical: 10
      }
    })
  }
})

export default AppStack
