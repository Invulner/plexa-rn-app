import CustomDrawerComponent from '../components/feed/drawer/CustomDrawerComponent'
import { createDrawerNavigator } from 'react-navigation'
import { Dimensions } from 'react-native'
import FeedStack from './StackFeedNavigator'
import TermsOfService from '../screens/terms/TermsOfService'

//const { width } = Dimensions.get('window')

const FeedDrawerNavigator = createDrawerNavigator({
  Feed: {
    screen: FeedStack,
  }
}, {
  contentComponent: CustomDrawerComponent,
  // drawerWidth: width * 0.85
})

export default FeedDrawerNavigator
