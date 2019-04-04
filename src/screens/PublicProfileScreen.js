import React, { Component } from 'react'
import { View, ScrollView } from 'react-native'
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
  componentDidMount() {
    this.props.getPublicUserProfile()
  }

  renderMedicalPractice = () => {
    return utils.getMedicalPractice(this.props.publicUser).map(obj => {

      return (
        <DetailsBox
          title={obj.title}
          list={obj.list}
          key={obj.title} />
        )
    })
  }

  render() {
    const { avatar_url, full_name, title, location, loading } = this.props.publicUser

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
            {this.renderMedicalPractice()}
            {/* {!!specialities.length &&
              <DetailsBox
                title={'Speciality'}
                list={specialities} />
            }
            {!!sub_specialities.length &&
              <DetailsBox
                title={'Sub-speciality'}
                list={sub_specialities} />
            }
            {!!conditions.length &&
              <DetailsBox
                title={'Conditions of interest'}
                list={conditions} />
            }
            {!!interests.length &&
              <DetailsBox
                title={'Areas of interest'}
                list={interests} />
            } */}
          </ScrollView>
        }
      </SafeArea>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PublicProfileScreen)
