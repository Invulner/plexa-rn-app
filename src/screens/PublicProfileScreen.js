import React, { Component } from 'react'
import { StyleSheet, View, ScrollView, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import profileStyles from '../assets/styles/profileStyles'
import SafeArea from '../components/common/SafeArea'
import { LightText, SemiboldText } from '../components/common/fonts'
import AvatarBox from '../components/profile/AvatarBox'
import DetailsBox from '../components/profile/DetailsBox'
import Loader from '../components/common/Loader'
import utils from '../utils'
import PublicUserOperations from '../operations/PublicUserOperations'

const mapStateToProps = (state) => {
  const { publicUser } = state

  return { publicUser }
}

const mapDispatchToProps = (dispatch, { navigation }) => {
  const getPublicUserProfile = () => dispatch(PublicUserOperations.getPublicUserProfile(navigation))

  return { getPublicUserProfile }
}

class PublicProfileScreen extends Component {
  getLocation = (location) => { 
    let locationArr = location.filter((item, index) => index !== 1).map(item => item.name)
    let locationString = `${locationArr[1]}, ${locationArr[0]}`

    return utils.truncate(locationString, 20)
  }

  componentDidMount() {
    this.props.getPublicUserProfile()
    console.log('mount')
  }

  render() {
    console.log('render')
    const { avatar_url, full_name, title, location, specialities, sub_specialities, conditions, interests, loading } = this.props.publicUser

    if (full_name === 'Plexa Medbot') {
      return (
        <SafeArea>
          {loading ? 
            <View style={styles.container}>
              <ActivityIndicator size='large' />
            </View>
            :
            <AvatarBox 
              avatar_url={avatar_url} 
              full_name={full_name} />
          }
        </SafeArea>
      )
    }
    
    return (
      <SafeArea>
        {loading ?
          <Loader />
          :
          <ScrollView>
            <AvatarBox 
              avatar_url={avatar_url} 
              full_name={full_name} />

            <LightText style={profileStyles.heading}>
              PROFILE
            </LightText>
          
              <View style={profileStyles.profileDetailBox}>
                <SemiboldText style={profileStyles.text}>
                  Type
                </SemiboldText>
                <LightText style={styles.profileDetails}>
                  {title}
                </LightText>
              </View>

              <View style={profileStyles.profileDetailBox}>
                <SemiboldText style={profileStyles.text}>
                  Location
                </SemiboldText>
                <LightText style={styles.profileDetails}>
                  {this.getLocation(location)}
                </LightText>
              </View>

            <LightText style={profileStyles.heading}>
              MEDICAL PRACTICE
            </LightText>
            {!!specialities.length &&
              <DetailsBox 
              detailTitle={'Speciality'} 
              detail={specialities} />
            }
            {!!sub_specialities.length &&
              <DetailsBox 
              detailTitle={'Sub-speciality'} 
              detail={sub_specialities} />
            }
            {!!conditions.length &&
              <DetailsBox 
              detailTitle={'Conditions of interest'} 
              detail={conditions} />
            }
            {!!interests.length && 
              <DetailsBox 
              detailTitle={'Areas of interest'} 
              detail={interests} />
            }
          </ScrollView>
        }
      </SafeArea>
    )
  }
}

const styles = StyleSheet.create({
  profileDetails: {
    ...profileStyles.text,
    marginLeft: 'auto'
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(PublicProfileScreen)
