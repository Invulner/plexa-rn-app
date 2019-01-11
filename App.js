import React from 'react'
import { Provider } from 'react-redux'
import store from './src/store'
import { StatusBar } from 'react-native'
import SwitchAppNavigator from './src/navigators/SwitchAppNavigator'
import { createAppContainer } from 'react-navigation'

const AppContainer = createAppContainer(SwitchAppNavigator)

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
          <StatusBar />
          <AppContainer />
      </Provider>
    )
  }
}
