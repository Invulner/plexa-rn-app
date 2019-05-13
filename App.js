import React from 'react'
import { Provider } from 'react-redux'
import { store, persistor } from './src/store'
import { StatusBar } from 'react-native'
import SwitchAppNavigator from './src/navigators/SwitchAppNavigator'
import { createAppContainer } from 'react-navigation'
import { Font } from 'expo'
import { PersistGate } from 'redux-persist/integration/react'

const AppContainer = createAppContainer(SwitchAppNavigator)

export default class App extends React.Component {
  state = {
    fontLoaded: false
  }

  async componentDidMount() {
    await Font.loadAsync({
      'URWGeometric-light': require('./src/assets/fonts/URWGeometric-Light.ttf'),
      'URWGeometric-regular': require('./src/assets/fonts/URWGeometric-Regular.ttf'),
      'URWGeometric-semibold': require('./src/assets/fonts/URWGeometric-SemiBold.ttf'),
      'URWGeometric-bold': require('./src/assets/fonts/URWGeometric-Bold.ttf')
    })
    this.setState({
      fontsLoaded: true
    })
  }
  
  render() {
    const { fontsLoaded } = this.state

    return (
      <Provider store={store}>
          <StatusBar />
            <PersistGate loading={null} persistor={persistor}>
              {fontsLoaded ? 
                <AppContainer />
                :
                null
              }
        </PersistGate>
      </Provider>
    )
  }
}
