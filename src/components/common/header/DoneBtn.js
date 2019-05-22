import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { RegularText } from '../fonts'
import { BRAND_DARK } from '../../../assets/styles/colors'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  const { link_url, content } = state.post

  return {
    link_url,
    content
  }
}

class DoneBtn extends Component {
  isBtnActive = () => {
    const { link_url, content, navigation } = this.props
    const isImageExist = navigation.getParam('isImageExist')
    
    return link_url || content.trim().length || isImageExist
  }

  render() {
    const { navigation, btnText } = this.props
    const isComposeScreen = navigation.getParam('isComposeScreen')
    
    return (
      <TouchableOpacity
        disabled={isComposeScreen && !this.isBtnActive()}
        style={styles.btn}
        onPress={navigation.getParam('onDonePress')}>
        <RegularText style={[
          styles.text, 
          !isComposeScreen && { color: BRAND_DARK }, 
          isComposeScreen && this.isBtnActive() && { color: BRAND_DARK }]}>
          {btnText || 'Done'}
        </RegularText>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: 'rgba(126, 120, 100, 0.6)',
    marginTop: 10,
  },

  btn: {
    marginRight: 10
  }
})

export default connect(mapStateToProps, null)(DoneBtn)
