import React, { Component } from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity} from 'react-native'
import { connect } from 'react-redux'
import SafeArea from '../components/common/SafeArea'
import { RegularText } from '../components/common/fonts'
import { BRAND_LIGHT, RED } from '../assets/styles/colors'
import PostActions from '../actions/PostActions'

const mapDispatchToProps = (dispatch) => {
  const saveLink = (link) => dispatch(PostActions.saveLinkUrl(link))

  return { saveLink }
}

class AddLinkScreen extends Component {
  state = {
    link: ''
  }

  onInputClear = () => {
    this.setState({ link: '' })
  }

  isEmptyInput = () => {
    return !this.state.link.trim().length
  }

  onSubmit = () => {
    const { navigation, saveLink } = this.props
    const { link } = this.state
    saveLink(link)
    navigation.navigate('Compose')
  }

  render() {
    const { link } = this.state

    return (
      <SafeArea>
        <View style={styles.container}>
          <TextInput 
            style={styles.input}
            placeholder='Type a link here'
            value={link}
            onChangeText={link => this.setState({ link })} />
        </View>
            <View style={styles.btnBox}>

              <TouchableOpacity 
                style={[styles.btn, styles.btnClear]}
                onPress={this.onInputClear}>
                <RegularText style={styles.btnText}>
                  Clear
                </RegularText>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.btn, styles.btnAttach]}
                disabled={this.isEmptyInput()}
                onPress={this.onSubmit}>
                <RegularText style={styles.btnText}>
                  Attach
                </RegularText>
              </TouchableOpacity>

            </View>
      </SafeArea>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    alignSelf: 'stretch',
    width: '100%',
    fontSize: 20
  },

  container: {
    paddingHorizontal: 10,
    paddingTop: 20,
    minHeight: 120
  },

  btnBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10
  },

  btn: {
    height: 35,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 5
  },

  btnText: {
    fontSize: 18,
    color: '#fff',
    marginTop: 3
  },

  btnClear: {
    backgroundColor: RED
  },

  btnAttach: {
    backgroundColor: BRAND_LIGHT
  }
})

export default connect(null, mapDispatchToProps)(AddLinkScreen)
