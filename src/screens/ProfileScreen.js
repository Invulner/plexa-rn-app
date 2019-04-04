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

const mapStateToProps = (state) => {
  const { user } = state

  return { user }
}

const mapDispatchToProps = (dispatch, { navigation }) => {
  const logout = () => dispatch(UserOperations.logout(navigation))

  return { logout }
}

class ProfileScreen extends Component {
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
    const { navigation: { navigate }, user } = this.props
    const { full_name, avatar_url, title, location, logout } = user

    return (
      <SafeArea>
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
          <UserDataBox
            title={'Location'}
            data={utils.getLocation(location)} />

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
