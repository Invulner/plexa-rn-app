import React, { Component } from 'react'
import { ScrollView } from 'react-native'
import SafeArea from '../components/common/SafeArea'
import { connect } from 'react-redux'
import PostActions from '../actions/PostActions'
import { getSortedGroups } from '../selectors/Groups'
import UserOperations from '../operations/UserOperations'
import Loader from '../components/common/Loader'
import UserListItem from '../components/compose/UserListItem'

const mapStateToProps = (state) => {
  const { group_id } = state.post
  const { loading } = state.user

  return {
    groups: getSortedGroups(state),
    group_id,
    loading
  }
}

const mapDispatchToProps = (dispatch, { navigation }) => {
  const saveGroup = (id) => dispatch(PostActions.saveGroup(id))
  const deleteGroup = () => dispatch(PostActions.deleteGroup())
  const refreshUserProfile = () => dispatch(UserOperations.refreshUserProfile(navigation))

  return {
    saveGroup,
    deleteGroup,
    refreshUserProfile
  }
}

class AddGroupScreen extends Component {
  navigateToComposeScreen = () => {
    this.props.navigation.navigate('Compose')
  }

  onGroupPress = (id) => {
    const { saveGroup } = this.props

    saveGroup(id)
    this.navigateToComposeScreen()
  }

  onNoGroupPress = () => {
    const { deleteGroup } = this.props

    deleteGroup()
    this.navigateToComposeScreen()
  }

  renderGroups = () => {
    const { groups, group_id } = this.props

    return groups.map(item => (
      <UserListItem
        name={item.name}
        key={item.id}
        isChosen={group_id === item.id}
        onItemPress={() => this.onGroupPress(item.id)} />
    ))
  }

  componentDidMount() {
    this.props.refreshUserProfile()
  }

  render() {
    const { group_id, loading } = this.props

    return (
      <SafeArea>
        {!!loading ?
          <Loader />
          :
          <ScrollView>
            <UserListItem
              name={'No Group'}
              onItemPress={this.onNoGroupPress}
              isChosen={!group_id} />
            {this.renderGroups()}
          </ScrollView>
        }
      </SafeArea>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddGroupScreen)
