import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity, Alert, ImageBackground, Image } from 'react-native'
import { connect } from 'react-redux'
import SafeArea from '../components/common/SafeArea'
import { RegularText } from '../components/common/fonts'
import GreyLine from '../components/common/GreyLine'
import { BRAND_LIGHT, GRAY } from '../assets/styles/colors'
import FeedOperations from '../operations/FeedOperations'
import Spinner from 'react-native-loading-spinner-overlay'
import Topics from '../components/compose/Topics'
import Controls from '../components/compose/Controls'
import Message from '../components/compose/Message'
import AttachBtn from '../components/compose/AttachBtn'
import PostActions from '../actions/PostActions'
import { ImagePicker, Permissions } from 'expo'
import PostOperations from '../operations/PostOperations'
import Photo from '../components/compose/Photo'

const mapStateToProps = (state) => {
  const { post } = state

  return { post }
}

const mapDispatchToProps = (dispatch) => {
  const savePost = (post, cb) => dispatch(FeedOperations.savePost(post, cb))
  const resetPost = () => dispatch(PostActions.resetPost())
  const postWithImage = (image, cb) => dispatch(PostOperations.postWithImage(image, cb))

  return { 
    savePost,
    resetPost,
    postWithImage
  }
}

class ComposeScreen extends Component {
  state = {
    spinner: false,
    imageURI: ''
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
    return !this.props.post.content
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

  postWithImage = () => {
    const { imageURI } = this.state
    const data = new FormData()

    data.append('image', {
      uri: imageURI,
      name: 'photo.jpg',
      type: 'image/jpg'
    })
    this.props.postWithImage(data, this.makePost)
    this.toggleOverlay()
  }

  makePost = () => {
    const { post } = this.props
    const { link_url, content, ...rest } = post
    const obj = link_url ? post : rest
    const data = {  ...obj, content: content.trim() }

    const cb = () => {
      this.toggleOverlay()
      this.navigateToFeed()
      this.props.resetPost()
    }

    !post.image_ids.length && this.toggleOverlay()
    this.props.savePost(data, cb)
  }

  onSubmit = () => {
    if (this.isTopicSelected()) {
      this.state.imageURI ? this.postWithImage() : this.makePost()
    } else {
      Alert.alert('Error', 'At least one topic has to be selected')
    }
  }

  render() {
    const { spinner, imageURI } = this.state
    const { link_url, group_id } = this.props.post

    return (
      <SafeArea>
        <Spinner visible={spinner} />
        <View style={{minHeight: 325, padding: 10, paddingTop: 20}}>
          <Message />
          {!!imageURI && 
            <Photo 
              onPress={() => this.setState({imageURI: ''})}
              imageSrc={imageURI} />
          }
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

            <AttachBtn iconType={'location'} />

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
