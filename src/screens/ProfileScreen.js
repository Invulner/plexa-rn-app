import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ScrollView } from 'react-native'
import SafeArea from '../components/common/SafeArea'
import UserOperations from '../operations/UserOperations'
import AvatarBox from '../components/profile/AvatarBox'
import DetailsBox from '../components/profile/DetailsBox'
import Button from '../components/profile/Button'
import utils from '../utils'
import Heading from '../components/profile/Heading'
import UserDataBox from '../components/profile/UserDataBox'
import { NavigationEvents } from 'react-navigation'

const mapStateToProps = (state) => {
  const { user } = state

  return { user }
}

const mapDispatchToProps = (dispatch, { navigation: { navigate } }) => {
  const logout = () => dispatch(UserOperations.logout(navigate))

  return { logout }
}

class ProfileScreen extends Component {
  getParentNavigation = () => {
    return this.props.navigation.dangerouslyGetParent()
  }

  setScreenParams = () => {
    this.getParentNavigation().setParams({
      isProfileScreen: true
    })
  }

  resetScreenParams = () => {
    this.getParentNavigation().setParams({
      isProfileScreen: false
    })
  }

  renderMedicalPractice = () => {
      return utils.getMedicalPractice(this.props.user).map(obj => {

        return (
          <DetailsBox
            title={obj.title}
            list={obj.list}
            key={obj.title} />
          )
      })
  }

  render() {
    const { navigation: { navigate }, user, logout } = this.props
    const { full_name, avatar_url, title, location } = user

    return (
      <SafeArea>
        <NavigationEvents
          onDidFocus={this.setScreenParams}
          onDidBlur={this.resetScreenParams} />
        <ScrollView>
          {full_name && avatar_url &&
            <AvatarBox
              full_name={full_name}
              avatar_url={avatar_url} />
          }

          <Heading heading={'profile'} />
          <UserDataBox
            title={'Type'}
            data={title} />
          {!!location &&
            <UserDataBox
              title={'Location'}
              data={utils.getLocation(location)} />
          }

          <Heading heading={'medical practice'} />
          {this.renderMedicalPractice()}

          <Heading heading={'about'} />
          <Button
            onBtnPress={() => navigate('Policy')}
            title={'Privacy Policy'} />
          <Button
            onBtnPress={() => navigate('Terms')}
            title={'Terms of Service'} />
          <Button
            onBtnPress={logout}
            title={'Sign out'} />
        </ScrollView>
      </SafeArea>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)
