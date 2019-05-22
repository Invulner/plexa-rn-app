import React, { Component } from 'react'
import { View, StyleSheet, Alert, ScrollView, Keyboard, SafeAreaView } from 'react-native'
import { connect } from 'react-redux'
import GrayLine from '../components/common/GrayLine'
import FeedOperations from '../operations/FeedOperations'
import Spinner from 'react-native-loading-spinner-overlay'
import Topics from '../components/compose/Topics'
import Controls from '../components/compose/Controls'
import Message from '../components/compose/Message'
import AttachBtn from '../components/compose/AttachBtn'
import PostActions from '../actions/PostActions'
import { ImagePicker, Permissions } from 'expo'
import Photo from '../components/compose/Photo'
import LocationsActions from '../actions/LocationsActions'
import { KeyboardAccessoryNavigation } from 'react-native-keyboard-accessory'

const mapStateToProps = (state) => {
  const { post } = state

  return { post }
}

const mapDispatchToProps = (dispatch) => {
  const submitPost = (post, cb) => dispatch(FeedOperations.submitPost(post, cb))
  const resetPost = () => dispatch(PostActions.resetPost())
  const submitPostWithImage = (image, post, cb, postId) => dispatch(FeedOperations.submitPostWithImage(image, post, cb, postId))
  const deleteLocationObj = () => dispatch(LocationsActions.deleteLocationObj())
  const submitPostUpdate = (id, post, cb) => dispatch(FeedOperations.submitPostUpdate(id, post, cb))
  const deleteImageData = () => dispatch(PostActions.deleteImageData())

  return {
    submitPost,
    resetPost,
    submitPostWithImage,
    deleteLocationObj,
    submitPostUpdate,
    deleteImageData
  }
}

class ComposeScreen extends Component {
  setImageFromProps = () => {
    const { image_urls } = this.props.post

    return image_urls && image_urls.length ? image_urls[0].preview_url : ''
  }

  state = {
    spinner: false,
    imageURI: this.setImageFromProps(),
    keyboard: false
  }

  addEventListeners = () => {
    Keyboard.addListener('keyboardWillShow', this.onKeyboardShow)
    Keyboard.addListener('keyboardWillHide', this.onKeyboardHide)
  }

  onKeyboardShow = () => {
    this.setState({ keyboard: true })
  }

  onKeyboardHide = () => {
    this.setState({ keyboard: false })
  }

  attachImage = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)

    if (status === 'granted') {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'Images',
      })
      this.setState({ imageURI: result.uri })
    }
  }

  isEmptyInput = () => {
    return !this.props.post.content.trim().length
  }

  toggleOverlay = () => {
    this.setState(prevState => ({ spinner: !prevState.spinner }))
  }

  navigateToFeed = () => {
    this.props.navigation.navigate('Feed')
  }

  isTopicSelected = () => {
    return !!this.props.post.topic_ids.length
  }

  createImageFormData = () => {
    const { imageURI } = this.state
    const image = new FormData()

    image.append('image', {
      uri: imageURI,
      name: 'photo.jpg',
      type: 'image/jpg'
    })

    return image
  }

  submitPostWithImage = (post, cb) => {
    const image = this.createImageFormData()

    this.props.submitPostWithImage(image, post, cb)
  }

  submitPostUpdateWithImage = (postId, data, cb) => {
    const { submitPostUpdate, submitPostWithImage, post: { image_ids } } = this.props

    if (image_ids.length) {
      const { image_urls, ...rest } = data

      submitPostUpdate(postId, rest, cb)
    } else {
      const image = this.createImageFormData()

      submitPostWithImage(image, data, cb, postId)
    }
  }

  resetStateImg = () => {
    this.setState({ imageURI: '' })
    this.props.deleteImageData()
  }

  resetPost = () => {
    const { resetPost, deleteLocationObj } = this.props

    resetPost()
    deleteLocationObj()
  }

  isImageExist = () => {
    return !!this.state.imageURI
  }

  onSubmit = () => {
    if (this.isTopicSelected()) {
      const { post, submitPost, navigation,submitPostUpdate } = this.props
      const { link_url, news_id, content, ...rest } = post
      let obj

      if (link_url && news_id) 
        obj = post
      else if (link_url)
        obj = { ...rest, link_url }
      else 
        obj = rest

      const data = { ...obj, content: content.trim() }
      const postId = navigation.getParam('postId')

      const cb = () => {
        this.toggleOverlay()
        this.navigateToFeed()
      }

      this.toggleOverlay()
      
      if(postId) {
        this.isImageExist() ? this.submitPostUpdateWithImage(postId, data, cb) : submitPostUpdate(postId, data, cb)
      } else {
        this.isImageExist() ? this.submitPostWithImage(data, cb) : submitPost(data, cb)
      }
    } else {
      Alert.alert('Error', 'At least one topic has to be selected')
    }
  }

  isPostBtnActive = () => {
    const { link_url } = this.props.post

    return !this.isEmptyInput() || link_url || this.isImageExist()
  }

  componentDidMount() {
    this.addEventListeners()
    this.props.navigation.setParams({
      onDonePress: this.onSubmit,
      isImageExist: this.isImageExist(),
      isComposeScreen: true
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (!!prevState.imageURI !== !!this.state.imageURI) {
      this.props.navigation.setParams({
        isImageExist: this.isImageExist()
      })
    }
  }

  componentWillUnmount() {
    Keyboard.removeAllListeners('keyboardWillShow')
    Keyboard.removeAllListeners('keyboardWillHide')
    this.resetPost()
    this.props.navigation.setParams({ 
      postId: null,
      isComposeScreen: false
    })
  }

  render() {
    const { spinner, imageURI, keyboard } = this.state
    const { link_url, group_id, location_id } = this.props.post

    return (
      <SafeAreaView style={styles.container}>
        <Spinner visible={spinner} />

        <View>
          <View style={styles.inputBox}>
            <ScrollView>
              <Message noImage={!imageURI} />
              {!!imageURI &&
                <Photo
                  onClose={this.resetStateImg}
                  imageSrc={imageURI} />
              }
            </ScrollView>
          </View>
          
          {!keyboard &&
            <React.Fragment>
              <Topics />
              <Controls />
            </React.Fragment>
          }
        </View>

       {!keyboard &&
        <View>
          <GrayLine boxStyle={styles.lineSolid} />
          <View style={styles.btnBox}>
            <AttachBtn
              iconType={'photo'}
              onPress={this.attachImage}
              active={imageURI} />

            <AttachBtn
              active={!!link_url}
              route={'AddLink'}
              iconType={'link'} />

            <AttachBtn
              active={!!location_id}
              route={'AddLocation'}
              iconType={'location'} />

            <AttachBtn
              active={!!group_id}
              iconType={'users'}
              route={'AddGroup'} />
          </View>
          
          <GrayLine boxStyle={[styles.lineSolid, { marginBottom: 20 }]} />
        </View>
       }
        <KeyboardAccessoryNavigation
          bumperHeight={300}
          inSafeAreaView={true}
          nextHidden={true}
          previousHidden={true} />
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between', 
    flex: 1
  },

  inputBox: {
    height: 400,
    paddingTop: 20,
    paddingBottom: 15
  },

  btnBox: {
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    paddingHorizontal: 10,
    height: 50,
  },

  postText: {
    marginTop: 7,
    fontSize: 16,
    color: '#fff'
  },

  lineSolid: {
    paddingHorizontal: 0
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ComposeScreen)
