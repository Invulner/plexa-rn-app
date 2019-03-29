import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { RegularText } from '../../common/fonts'
import { BRAND_DARK } from '../../../assets/styles/colors'
import { withNavigation } from 'react-navigation'

class Done extends Component {
  render() {
    const { navigation } = this.props

    return (
      <TouchableOpacity
        style={styles.btn}
        onPress={navigation.getParam('onDonePress')}>
        <RegularText style={styles.text}>
          Done
        </RegularText>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: BRAND_DARK,
    marginTop: 10
  },

  btn: {
    marginRight: 10
  }
})

export default withNavigation(Done)
