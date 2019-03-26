import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import SafeArea from '../components/common/SafeArea'
import { RegularText } from '../components/common/fonts'
import GreyLine from '../components/common/GreyLine'
import { connect } from 'react-redux'
import { DARK_GRAY, BRAND_DARK } from '../assets/styles/colors'
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
  const saveGroup = id => dispatch(PostActions.saveGroup(id))
  const deleteGroup = () => dispatch(PostActions.deleteGroup())

  return { 
    saveGroup,
    deleteGroup
  }
}

class AddGroupScreen extends Component {
  renderGroups = () => {
    const { groups, saveGroup, group_id } = this.props

    return groups.map(item => {

      return (
        <View key={item.id}>
          <TouchableOpacity 
            style={styles.groupBox}
            onPress={() => saveGroup(item.id)}>
            <RegularText style={[styles.groupText, group_id === item.id && styles.groupSelected]}>
              {item.name}
            </RegularText>
          </TouchableOpacity>
          <GreyLine boxStyle={styles.lineSolid}/>
        </View>
      )
    })
  }

  render() {
    return (
      <SafeArea>   
        <TouchableOpacity 
          style={styles.groupBox}
          onPress={this.props.deleteGroup}>
          <RegularText style={styles.groupText}>
            No Group
          </RegularText>
        </TouchableOpacity>
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

  groupBox: {
    height: 50,
    paddingHorizontal: 10,
    justifyContent: 'center'
  },

  groupText: {
    fontSize: 18,
    marginTop: 10,
    color: DARK_GRAY
  },

  groupSelected: {
    color: BRAND_DARK
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(AddGroupScreen)
