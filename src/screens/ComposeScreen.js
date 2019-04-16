import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import SafeArea from '../components/common/SafeArea'
import { RegularText } from '../components/common/fonts'
import GreyLine from '../components/common/GreyLine'
import { BRAND_LIGHT } from '../assets/styles/colors'
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

const mapStateToProps = (state) => {
  const { post } = state

  return { post }
}

const mapDispatchToProps = (dispatch) => {
  const submitPost = (post, cb) => dispatch(FeedOperations.submitPost(post, cb))
  const resetPost = () => dispatch(PostActions.resetPost())
  const submitPostWithImage = (image, post, cb) => dispatch(FeedOperations.submitPostWithImage(image, post, cb))
  const deleteLocationObj = () => dispatch(LocationsActions.deleteLocationObj())
  const submitPostUpdate = (id, post, cb) => dispatch(FeedOperations.submitPostUpdate(id, post, cb))
  const deleteImageData = () => dispatch(PostActions.deleteImageData())
  const submitPostUpdateWithImage = (image, postId, data, cb) => dispatch(FeedOperations.submitPostUpdateWithImage(image, postId, data, cb))

  return {
    submitPost,
    resetPost,
    submitPostWithImage,
    deleteLocationObj,
    submitPostUpdate,
    deleteImageData,
    submitPostUpdateWithImage
  }
}

class ComposeScreen extends Component {
  setImageFromProps = () => {
    const { image_urls } = this.props.post

    return image_urls && image_urls.length ? image_urls[0].preview_url : ''
  }

  state = {
    spinner: false,
    imageURI: this.setImageFromProps()
  }

  attachImage = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)

    if (status === 'granted') {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'Images',
      })
      console.log(result)
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
    const { submitPostUpdate, submitPostUpdateWithImage, post: { image_ids } } = this.props

    if (image_ids.length) {
      const { image_urls, ...rest } = data

      submitPostUpdate(postId, rest, cb)
    } else {
      const image = this.createImageFormData()

      submitPostUpdateWithImage(image, postId, data, cb)
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
        this.state.imageURI ? this.submitPostUpdateWithImage(postId, data, cb) : submitPostUpdate(postId, data, cb)
      } else {
        this.state.imageURI ? this.submitPostWithImage(data, cb) : submitPost(data, cb)
      }
    } else {
      Alert.alert('Error', 'At least one topic has to be selected')
    }
  }

  componentWillUnmount() {
    this.resetPost()
    this.props.navigation.setParams({ postId: null })
  }

  render() {
    const { spinner, imageURI } = this.state
    const { link_url, group_id, location_id } = this.props.post

    return (
      <SafeArea>
        <Spinner visible={spinner} />
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

        <GreyLine boxStyle={styles.lineSolid} />

        <View style={styles.btnBox}>

          <View style={styles.leftIconBox}>
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

          <TouchableOpacity
            style={[styles.postBtn, (!this.isEmptyInput() || link_url) && styles.btnActive]}
            onPress={this.onSubmit}
            disabled={!link_url && this.isEmptyInput()}>
            <RegularText style={styles.postText}>
              Post
            </RegularText>
          </TouchableOpacity>
        </View>
        <GreyLine boxStyle={[styles.lineSolid, { marginBottom: 20 }]} />

        <Controls />
        <Topics />
      </SafeArea>
    )
  }
}

const styles = StyleSheet.create({
  inputBox: {
    height: 300,
    paddingTop: 20,
    paddingBottom: 15
  },

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

  leftIconBox: {
    flexDirection: 'row',
    width: '45%',
    justifyContent: 'space-between'
  },

  btnActive: {
    backgroundColor: BRAND_LIGHT
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ComposeScreen)
