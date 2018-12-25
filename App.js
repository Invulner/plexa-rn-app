import React from 'react'
import { Provider } from 'react-redux'
import store from './src/store'
import { StatusBar, SafeAreaView } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import SwitchAppNavigator from './src/navigators/SwitchAppNavigator'
import { createAppContainer } from 'react-navigation'

const AppContainer = createAppContainer(SwitchAppNavigator)

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <SafeAreaView style={styles.container}>
          <StatusBar hidden />
          <AppContainer />
        </SafeAreaView>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ededed',
    alignItems: 'center',
    justifyContent: 'center',
  }
})