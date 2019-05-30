import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { RegularText } from '../fonts'
import { BRAND_DARK } from '../../../assets/styles/colors'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  const { link_url, content } = state.post
  const { areUsersChosen } = state.chats

  return {
    link_url,
    content,
    areUsersChosen
  }
}

class DoneBtn extends Component {
  isBtnActive = () => {
    const { link_url, content, navigation, areUsersChosen } = this.props
    const isComposeScreen = navigation.getParam('isComposeScreen')
    const isImageExist = navigation.getParam('isImageExist')
    const isAddUsersScreen = navigation.getParam('isAddUsersScreen')
    const isEnoughtContent = link_url || content.trim().length || isImageExist

    if(isComposeScreen && isEnoughtContent || isAddUsersScreen && areUsersChosen) {
      return true
    }
  }

  render() {
    const { navigation, btnText } = this.props
    const isComposeScreen = navigation.getParam('isComposeScreen')
    const isAddUsersScreen = navigation.getParam('isAddUsersScreen')
    const isBtnActive = this.isBtnActive()
    
    return (
      <TouchableOpacity
        disabled={isComposeScreen && !isBtnActive || isAddUsersScreen && !isBtnActive}
        style={styles.btn}
        onPress={navigation.getParam('onDonePress')}>
        <RegularText style={[
          styles.text, 
          !isComposeScreen && !isAddUsersScreen && { color: BRAND_DARK },
          (isComposeScreen  && isBtnActive || 
          isAddUsersScreen && isBtnActive) && { color: BRAND_DARK }]}>
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
