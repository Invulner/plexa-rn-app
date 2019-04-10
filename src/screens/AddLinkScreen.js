import React, { Component } from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import SafeArea from '../components/common/SafeArea'
import PostActions from '../actions/PostActions'

const mapStateToProps = (state) => {
  const { link_url, news_id } = state.post

  return { 
    link_url,
    news_id
  }
}

const mapDispatchToProps = (dispatch) => {
  const saveLink = (link, news_id) => dispatch(PostActions.saveLink(link, news_id))

  return { saveLink }
}

class AddLinkScreen extends Component {
  state = {
    link_url: this.props.link_url
  }

  onSubmit = () => {
    const { navigation, saveLink, news_id } = this.props
    const { link_url } = this.state
    
    link_url ? saveLink(link_url, news_id) : saveLink(link_url, null)
    navigation.navigate('Compose')
  }

  componentDidMount() {
    this.props.navigation.setParams({
      onDonePress: this.onSubmit
    })
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
      </SafeArea>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    alignSelf: 'stretch',
    width: '100%',
    fontSize: 20,
    marginBottom: 15,
    flex: 1
  },

  container: {
    paddingHorizontal: 10,
    paddingTop: 20,
    minHeight: 120,
    flex: 1
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(AddLinkScreen)
