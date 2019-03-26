import React, { Component } from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity} from 'react-native'
import { connect } from 'react-redux'
import SafeArea from '../components/common/SafeArea'
import { RegularText } from '../components/common/fonts'
import { BRAND_LIGHT, RED } from '../assets/styles/colors'
import PostActions from '../actions/PostActions'

const mapStateToProps = (state) => {
  const { link_url } = state.post

  return { link_url }
}

const mapDispatchToProps = (dispatch) => {
  const saveLink = (link) => dispatch(PostActions.saveLink(link))
  const clearLink = () => dispatch(PostActions.clearLink())

  return { 
    saveLink, 
    clearLink 
  }
}

class AddLinkScreen extends Component {
  state = {
    link_url: this.props.link_url
  }

  onInputClear = () => {
    this.setState({ link_url: '' })
    this.props.clearLink()
  }

  isEmptyInput = () => {
    return !this.state.link_url.trim()
  }

  onSubmit = () => {
    const { navigation, saveLink } = this.props
    const { link_url } = this.state
    
    saveLink(link_url)
    navigation.navigate('Compose')
  }

  render() {
    const { link_url } = this.state

    return (
      <SafeArea>
        <View style={styles.container}>
          <TextInput 
            style={styles.input}
            multiline={true}
            placeholder='Type a link here'
            value={link_url}
            onChangeText={link => this.setState({ link_url: link })} />
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

export default connect(mapStateToProps, mapDispatchToProps)(AddLinkScreen)
