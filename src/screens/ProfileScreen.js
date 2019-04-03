import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, ScrollView, TouchableOpacity } from 'react-native'
import SafeArea from '../components/common/SafeArea'
import { LightText } from '../components/common/fonts'
import profileStyles from '../assets/styles/profileStyles'
import UserOperations from '../operations/UserOperations'
import AvatarBox from '../components/profile/AvatarBox'
import DetailsBox from '../components/profile/DetailsBox'
import Button from '../components/profile/Button'

const mapStateToProps = (state) => {
  const { full_name, avatar_url, specialities, interests } = state.user

  return {
    full_name,
    avatar_url,
    specialities,
    interests
  }
}

const mapDispatchToProps = (dispatch, { navigation }) => {
  const logout = () => dispatch(UserOperations.logout(navigation))

  return { logout }
}

class ProfileScreen extends Component {
  renderTerms = (title, route) => {
    return (
      <View style={profileStyles.detailBox}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate(route)}>
          <LightText style={profileStyles.text}>
            {title}
          </LightText>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    const { full_name, avatar_url, specialities, interests, logout, navigation: { navigate } } = this.props

    return (
      <SafeArea>
        <ScrollView>
          {full_name && avatar_url &&
            <AvatarBox
              full_name={full_name}
              avatar_url={avatar_url} />
          }

          <LightText style={profileStyles.heading}>
            MEDICAL PRACTICE
          </LightText>
          {specialities && !!specialities.length &&
            <DetailsBox
              detailTitle={'Speciality'}
              detail={specialities} />
          }
          {interests && !!interests.length &&
            <DetailsBox
              detailTitle={'Areas of interest'}
              detail={interests} />
          }

          <LightText style={profileStyles.heading}>
            ABOUT
          </LightText>

          {/* {this.renderTerms('Privacy Policy', 'Policy')}
          {this.renderTerms('Terms of Service', 'Terms')} */}
          <Button
            onBtnPress={() => navigate('Policy')}
            title={'Privacy Policy'} />
          <Button
            onBtnPress={() => navigate('Terms')}
            title={'Terms of Service'} />
          <Button
            onBtnPress={logout}
            title={'Sign out'} />

          {/* <View style={profileStyles.detailBox}>
            <LightText
              style={profileStyles.text}
              onPress={logout}>
              Sign out
            </LightText>
          </View> */}
        </ScrollView>
      </SafeArea>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)
