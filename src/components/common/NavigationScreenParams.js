import { withNavigationFocus } from 'react-navigation'

function NavigationScreenParams({ screen, isFocused, navigation }) {
  const getParentNavigation = () => {
    return navigation.dangerouslyGetParent()
  }
  // console.log('getParentNavigation()', getParentNavigation())
  const setScreenParams = () => {
    console.log('setScreenParams')
    getParentNavigation().setParams({
      currentScreen: screen
    })
  }

  const resetScreenParams = () => {
    console.log('resetScreenParams')
    getParentNavigation().setParams({
      currentScreen: null
    })
  }

  isFocused ? setScreenParams() : resetScreenParams()

  return null
}

export default withNavigationFocus(NavigationScreenParams)
