import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, ScrollView } from 'react-native'
import SafeArea from '../components/common/SafeArea'
import { LightText } from '../components/common/fonts'
import profileStyles from '../assets/styles/profileStyles'
import UserOperations from '../operations/UserOperations'
import AvatarBox from '../components/profile/AvatarBox'
import DetailsBox from '../components/profile/DetailsBox'

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
  render() {
    const { full_name, avatar_url, specialities, interests, navigation, logout } = this.props

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

          <View style={profileStyles.detailBox}>
            <LightText 
              style={profileStyles.text}
              onPress={() => navigation.navigate('Policy')}>
              Privacy Policy
            </LightText>
          </View>

          <View style={profileStyles.detailBox}>
            <LightText 
              style={profileStyles.text}
              onPress={() => navigation.navigate('Terms')}>
              Terms of Service
            </LightText>
          </View>

          <View style={profileStyles.detailBox}>
            <LightText 
              style={profileStyles.text}
              onPress={logout}>
              Sign out
            </LightText>
          </View>
        </ScrollView>
      </SafeArea>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)
