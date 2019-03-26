import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import SafeArea from '../components/common/SafeArea'
import { RegularText } from '../components/common/fonts'
import GreyLine from '../components/common/GreyLine'
import { connect } from 'react-redux'
import { DARK_GRAY } from '../assets/styles/colors'

const mapStateToProps = (state) => {
  const { groups } = state.user

  return { groups }
}

class AddGroupScreen extends Component {
  renderGroups = () => {
    return this.props.groups.map(item => {

      return (
        <View key={item.id}>
          <TouchableOpacity style={styles.groupBox}>
            <RegularText style={styles.groupText}>
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
        <TouchableOpacity style={styles.groupBox}>
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
  }
})

export default connect(mapStateToProps, null)(AddGroupScreen)
