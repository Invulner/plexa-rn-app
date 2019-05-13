import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducers'
import { persistStore, persistReducer } from 'redux-persist'
import { AsyncStorage } from 'react-native'

const persistConfig = {
  key: 'app',
  storage: AsyncStorage,
  whitelist: ['user']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const middlewares = [thunk]
const enhancer = composeWithDevTools(
  {
    // Options: https://github.com/jhen0409/react-native-debugger#options
  },
)(applyMiddleware(...middlewares))
export const store = createStore(persistedReducer, undefined, enhancer)
export const persistor = persistStore(store)
