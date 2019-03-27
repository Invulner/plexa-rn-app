import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native'
import SafeArea from '../components/common/SafeArea'
import { RegularText } from '../components/common/fonts'
import GreyLine from '../components/common/GreyLine'
import { connect } from 'react-redux'
import { DARK_GRAY } from '../assets/styles/colors'
import PostActions from '../actions/PostActions'

const mapStateToProps = (state) => {
  const { groups } = state.user
  const { group_id } = state.post

  return { 
    groups,
    group_id
  }
}

const mapDispatchToProps = (dispatch) => {
  const saveGroup = (id) => dispatch(PostActions.saveGroup(id))
  const deleteGroup = () => dispatch(PostActions.deleteGroup())

  return { 
    saveGroup,
    deleteGroup
  }
}

class AddGroupScreen extends Component {
  navigateToComposeScreen = () => {
    this.props.navigation.navigate('Compose')
  }

  onGroupPress = (id) => {
    const { saveGroup} = this.props

    saveGroup(id)
    this.navigateToComposeScreen()
  }

  onNoGroupPress = () => {
    const { deleteGroup } = this.props

    deleteGroup()
    this.navigateToComposeScreen()
  }

  renderIcon = () => {
    return (
      <Image 
        style={styles.icon}
        source={require('../assets/icons/checked.png')} />
    )
  }

  renderGroups = () => {
    const { groups, group_id } = this.props

    return groups.map(item => {

      return (
        <View key={item.id}>
          <View style={styles.groupBox}>
            <TouchableOpacity
              style={styles.btn}
              onPressIn={() => this.onGroupPress(item.id)}>
              <RegularText style={styles.groupText}>
                {item.name}
              </RegularText>
            </TouchableOpacity>
            {group_id === item.id && this.renderIcon()}
          </View>
          <GreyLine boxStyle={styles.lineSolid}/>
        </View>
      )
    })
  }

  render() {
    const { group_id } = this.props

    return (
      <SafeArea> 
        <View style={styles.groupBox}>
          <TouchableOpacity
            style={styles.btn}  
            onPressIn={this.onNoGroupPress}>
            <RegularText style={styles.groupText}>
              No Group
            </RegularText>
          </TouchableOpacity>
          {!group_id && this.renderIcon()}
        </View>
        <GreyLine boxStyle={styles.lineSolid}/>
        {this.renderGroups()}
      </SafeArea>
    )
  }
}

const styles = StyleSheet.create({
  lineSolid: {
    paddingHorizontal: 0
  },

  btn: {
    flex: 1
  },

  groupBox: {
    height: 50,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },

  groupText: {
    fontSize: 18,
    marginTop: 10,
    color: DARK_GRAY
  },

  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain'
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(AddGroupScreen)
