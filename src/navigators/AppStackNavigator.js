import React from 'react'
import { createStackNavigator } from 'react-navigation'
import AppTabNavigator from './AppTabNavigator'
import HeaderLogo from '../components/common/header/HeaderLogo'
import ComposeBtn from '../components/common/header/ComposeBtn'
import AddUsersBtn from '../components/common/header/AddUsersBtn'

const AppStack = createStackNavigator({
  App: {
    screen: AppTabNavigator,
    navigationOptions: ({ navigation }) => ({
      headerTitle: <HeaderLogo navigation={navigation} />,
      headerLeft: <ComposeBtn navigation={navigation} />,
      headerRight: <AddUsersBtn navigation={navigation} />,
      headerStyle: {
        paddingVertical: 10
      }
    })
  }
})

export default AppStack
