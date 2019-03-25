import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native'
import { connect } from 'react-redux'
import SafeArea from '../components/common/SafeArea'
import { RegularText } from '../components/common/fonts'
import GreyLine from '../components/comment/GreyLine'
import { BRAND_LIGHT } from '../assets/styles/colors'
import FeedOperations from '../operations/FeedOperations'
import Spinner from 'react-native-loading-spinner-overlay'
import Topics from '../components/compose/Topics'
import Controls from '../components/compose/Controls'
import Message from '../components/compose/Message'

const mapDispatchToProps = (dispatch) => {
  const savePost = (post, cb) => dispatch(FeedOperations.savePost(post, cb))

  return { savePost }
}

class ComposeScreen extends Component {
  state = {
    message: '',
    topicIDs: [],
    spinner: false,
    controls: {
      commentsEnabled: true,
      isPublic: true
    },
    link_url: ''
  }

  isEmptyInput = () => {
    const { message } = this.state

    return !message.trim().length
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
    if (this.isTopicSelected()) {
      const { message, topicIDs, controls: { commentsEnabled, isPublic } }  = this.state
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

  render() {
    const { spinner, message, controls } = this.state
    const { navigate } = this.props.navigation

    return (
      <SafeArea>
        <Spinner visible={spinner} />
        <Message 
          value={message} 
          onTextChange={message => this.setState({ message })} />
        <GreyLine boxStyle={styles.lineSolid} />
        
        <View style={styles.btnBox}>

          <View style={styles.leftIconBox}>
            <TouchableOpacity>
              <Image
                source={require('../assets/icons/photo-upload.png')}
                style={styles.iconUpload} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigate('AddLink')}>
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
          </View>

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

        <Controls 
          values={controls}
          onToggle={controls => this.setState({ controls })} />
        <Topics onTopicPress={topicIDs => this.setState({ topicIDs })} />
      </SafeArea>
    )
  }
}

const styles = StyleSheet.create({
  btnBox: {
    alignItems: 'center',
    justifyContent: 'space-between',
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
  }
})

export default connect(null, mapDispatchToProps)(ComposeScreen)
