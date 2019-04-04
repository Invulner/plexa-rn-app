import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ScrollView, View } from 'react-native'
import SafeArea from '../components/common/SafeArea'
import { LightText, SemiboldText } from '../components/common/fonts'
import profileStyles from '../assets/styles/profileStyles'
import UserOperations from '../operations/UserOperations'
import AvatarBox from '../components/profile/AvatarBox'
import DetailsBox from '../components/profile/DetailsBox'
import Button from '../components/profile/Button'
import utils from '../utils'

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

          <LightText style={profileStyles.heading}>
            PROFILE
          </LightText>

          <View style={profileStyles.profileDetailBox}>
            <SemiboldText style={profileStyles.text}>
              Type
            </SemiboldText>
            <LightText style={profileStyles.profileDetails}>
              {title}
            </LightText>
          </View>

          <View style={profileStyles.profileDetailBox}>
            <SemiboldText style={profileStyles.text}>
              Location
            </SemiboldText>
            <LightText style={profileStyles.profileDetails}>
              {utils.getLocation(location)}
            </LightText>
          </View>

          <LightText style={profileStyles.heading}>
            MEDICAL PRACTICE
          </LightText>
          {/* {specialities && !!specialities.length &&
            <DetailsBox
              title={'Speciality'}
              list={specialities} />
          }
          {interests && !!interests.length &&
            <DetailsBox
              title={'Areas of interest'}
              list={interests} />
          } */}
          {this.renderMedicalPractice()}

          <LightText style={profileStyles.heading}>
            ABOUT
          </LightText>

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
