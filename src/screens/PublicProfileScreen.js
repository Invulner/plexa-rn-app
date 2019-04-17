import React, { Component } from 'react'
import { ScrollView } from 'react-native'
import { connect } from 'react-redux'
import SafeArea from '../components/common/SafeArea'
import AvatarBox from '../components/profile/AvatarBox'
import DetailsBox from '../components/profile/DetailsBox'
import Loader from '../components/common/Loader'
import utils from '../utils'
import PublicUserOperations from '../operations/PublicUserOperations'
import Heading from '../components/profile/Heading'
import UserDataBox from '../components/profile/UserDataBox'

const mapStateToProps = (state) => {
  const { publicUser } = state

  return { publicUser }
}

const mapDispatchToProps = (dispatch, { navigation }) => {
  const getPublicUserProfile = () => dispatch(PublicUserOperations.getPublicUserProfile(navigation))

  return { getPublicUserProfile }
}

class PublicProfileScreen extends Component {
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

  componentDidMount() {
    this.props.getPublicUserProfile()
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

            <Heading heading={'profile'} />
            <UserDataBox
              title={'Type'}
              data={title} />
            <UserDataBox
              title={'Location'}
              data={utils.getLocation(location)} />

            <Heading heading={'medical practice'} />
            {this.renderMedicalPractice()}
          </ScrollView>
        }
      </SafeArea>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PublicProfileScreen)
