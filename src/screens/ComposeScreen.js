import React, { Component } from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity, Image, Alert, Switch } from 'react-native'
import { connect } from 'react-redux'
import SafeArea from '../components/common/SafeArea'
import ProfileAvatar from '../components/common/ProfileAvatar'
import { RegularText, SemiboldText, BoldText } from '../components/common/fonts'
import GreyLine from '../components/comment/GreyLine'
import { BRAND_LIGHT, GRAY, BRAND_DARK } from '../assets/styles/colors'
import FeedOperations from '../operations/FeedOperations'
import Spinner from 'react-native-loading-spinner-overlay'
import { hints } from '../constants'
import Topics from '../components/compose/Topics'

const mapStateToProps = (state) => {
  const { full_name: name, avatar_url: url } = state.user

  return {
    name,
    url
  }
}

const mapDispatchToProps = (dispatch) => {
  const savePost = (post, cb) => dispatch(FeedOperations.savePost(post, cb))

  return { savePost }
}

class ComposeScreen extends Component {
  state = {
    message: '',
    topicIDs: [],
    commentsEnabled: true,
    isPublic: true,
    spinner: false
  }

  isEmptyInput = () => {
    const { message } = this.state

    return !message.trim().length
  }

  onTextChange = (message) => {
    this.setState({ message })
  }

  toggleOverlay = () => {
    this.setState(prevState => ({ spinner: !prevState.spinner }))
  }

  navigateToFeed = () => {
    this.props.navigation.navigate('Feed')
  }

  isTopicSelected = () => {
    return !!this.state.topicIDs.length
  }

  onSubmit = () => {
    if(!this.isEmptyInput()) {

      if (this.isTopicSelected()) {
        const { message, topicIDs, commentsEnabled, isPublic } = this.state
        const post = {
          content: message,
          topic_ids: topicIDs,
          comments_enabled: commentsEnabled,
          public: isPublic
        }

        const cb = () => {
          this.toggleOverlay()
          this.navigateToFeed()
        }

        this.toggleOverlay()
        this.props.savePost(post, cb)
      } else {
        Alert.alert('Error', 'At least one topic has to be selected')
      }
    }
  }

  showHint = (key) => { 
    Alert.alert(hints[key].title, hints[key].text)
  }

  renderControls = () => {
    const controls = [
      {
        label: 'Replies',
        param: 'commentsEnabled'
      },
      {
        label: 'Privacy',
        param: 'isPublic'
      }
    ]

    return controls.map((item, index) => {

      return (
        <View 
          style={styles.controlBox}
          key={index}>
          <SemiboldText style={styles.label}>
            {item.label}
          </SemiboldText>

          <TouchableOpacity 
            style={styles.questionBox}
            onPress={() => this.showHint(item.label.toLowerCase())}>
            <BoldText style={styles.question}>
              ?
            </BoldText>
          </TouchableOpacity>
          <View style={styles.switchBox}>
            <Switch 
              onValueChange={value => this.setState({ [item.param]: value})}
              value={this.state[item.param]}
              style={styles.switch} />
          </View>
        </View>
      )
    })
  }

  render() {
    const { name, url } = this.props
    const { message, spinner } = this.state

    return (
      <SafeArea>
        <Spinner visible={spinner} />
        <View style={styles.inputBox}>
          <TextInput
            placeholder='Enter your message ...'
            style={styles.input}
            multiline={true}
            value={message}
            onChangeText={message => this.onTextChange(message)} />

          <ProfileAvatar
            url={url}
            name={name}
            size={'small'} />
        </View>
        <GreyLine boxStyle={styles.lineSolid} />
        <View style={styles.btnBox}>

          {/* <View style={styles.leftIconBox}>
            <TouchableOpacity>
              <Image
                source={require('../assets/icons/photo-upload.png')}
                style={styles.iconUpload} />
            </TouchableOpacity>

            <TouchableOpacity>
              <Image
                source={require('../assets/icons/link.png')}
                style={styles.iconUpload} />
            </TouchableOpacity>

            <TouchableOpacity>
              <Image
                source={require('../assets/icons/location.png')}
                style={styles.iconUpload} />
            </TouchableOpacity>

            <TouchableOpacity>
              <Image
                source={require('../assets/icons/users-group.png')}
                style={styles.iconUpload} />
            </TouchableOpacity>
          </View> */}

          <TouchableOpacity 
            style={[styles.postBtn, !this.isEmptyInput() && styles.btnActive]}
            onPress={this.onSubmit}
            disabled={this.isEmptyInput()}>
            <RegularText style={styles.postText}>
              Post
            </RegularText>
          </TouchableOpacity>
        </View>
        <GreyLine boxStyle={[styles.lineSolid, { marginBottom: 20 }]} />

        {this.renderControls()}

        <Topics onTopicPress={topicIDs => this.setState({ topicIDs })} />

      </SafeArea>
    )
  }
}

const styles = StyleSheet.create({
  inputBox: {
    paddingTop: 20,
    paddingLeft: 10,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    minHeight: 325
  },

  input: {
    fontSize: 20,
    width: '80%'
  },

  btnBox: {
    alignItems: 'center',
    //The following line should take precedence when activating commented buttons.
    // justifyContent: 'space-between',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    paddingHorizontal: 10,
    height: 50,
  },

  postBtn: {
    width: 80,
    height: 35,
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor: 'rgba(188, 172, 133, 0.5)',
    borderRadius: 7
  },

  postText: {
    marginTop: 7,
    fontSize: 16,
    color: '#fff'
  },

  lineSolid: {
    paddingHorizontal: 0
  },

  iconUpload: {
    width: 23,
    height: 23,
    resizeMode: 'contain'
  },

  leftIconBox: {
    flexDirection: 'row',
    width: '45%',
    justifyContent: 'space-between'
  },

  btnActive: {
    backgroundColor: BRAND_LIGHT
  },

  controlBox: {
    flexDirection: 'row',
    paddingHorizontal: 10
  },

  label: {
    fontSize: 20,
    marginRight: 7,
    marginTop: 8
  },

  questionBox: {
    width: 20,
    height: 20,
    borderRadius: 20,
    backgroundColor: GRAY,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 6
  },

  question: {
    color: '#fff',
    fontSize: 20,
    marginTop: 2
  },

  switchBox: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row'
  },

  switch: {
    transform: [{ scale: 0.6 }]
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ComposeScreen)
