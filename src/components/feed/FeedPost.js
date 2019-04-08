import React, { Component } from 'react'
import { View, Image, StyleSheet, TouchableWithoutFeedback, Modal, TouchableOpacity, Dimensions } from 'react-native'
import { RegularText } from '../common/fonts'
import Research from './Research'
import LinkPreview from './LinkPreview'
import Social from '../common/Social'
import { feedStyles } from '../../assets/styles/feed/feedStyles'
import utils from '../../utils'
import News from './News'
import PostHead from '../common/PostHead'
import AutoHeightImage from 'react-native-auto-height-image'

const screenWidth = Dimensions.get('screen').width

class FeedPost extends Component {
  state = {
    modal: false
  }

  toggleModal = () => {
    this.setState(prevState => ({ modal: !prevState.modal }))
  }

  areAnyLinkDetails = () => {
    return Object.getOwnPropertyNames(this.props.item.link_details).length !== 0
  }

  renderResearch = () => {
    const { fullView, item: { news_item } } = this.props

    return <Research data={news_item} fullView={fullView} />
  }

  renderNews = () => {
    const { item, fullView } = this.props

    return <News item={item} fullView={fullView} />
  }

  renderLinkDetails = () => {
    const { item, fullView } = this.props

    return <LinkPreview item={item} fullView={fullView} />
  }

  renderAttachedBlock = () => {
    switch(this.props.item.news_kind) {
      case 'research':
        return this.renderResearch()
      case 'news':
        return this.renderNews()
      case null:
        if (this.areAnyLinkDetails())
          return this.renderLinkDetails()
        else
          return null
      default:
        return null
    }
  }

  renderContent = () => {
    const { fullView, item: { content } } = this.props

    if (content)
      return (
          <RegularText style={feedStyles.linkCaption}>
            {fullView ? content : utils.truncate(content)}
          </RegularText>
      )
    else
      return null
  }

  render() {
    const { navigation, fullView, item } = this.props
    const { id: postId, created_at, likes_count, answers_count, image_urls, author, liked } = item
    const opacity = 0.8

    return (
      <TouchableWithoutFeedback onPress={() => navigation.navigate('Post', {postId})}>
        <View style={[feedStyles.postContainer, fullView && styles.fullViewContainer]}>
        {!fullView && !!image_urls.length &&
          <Modal        
            animationType="fade"
            transparent={false}
            visible={this.state.modal}>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000'}}>
              <TouchableOpacity 
                onPress={this.toggleModal}
                activeOpacity={opacity}>
                <AutoHeightImage source={{uri: image_urls[0].url}} width={screenWidth} />
              </TouchableOpacity>
            </View>
          </Modal>
        }

          <PostHead
            author={author}
            created_at={created_at} />

            <View>
              {this.renderContent()}
              {!!image_urls.length &&
                <TouchableOpacity 
                  onPress={this.toggleModal}
                  activeOpacity={opacity}>
                  <Image
                    source={{uri: image_urls[0].preview_url}}
                    style={styles.linkImage} />
                </TouchableOpacity>
              }
              {this.renderAttachedBlock()}
            </View>

          <Social
            liked={liked}
            likesCount={likes_count}
            answersCount={answers_count}
            id={postId} />
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  linkImage: {
    ...feedStyles.linkImage,
    marginVertical: 5
  },

  fullViewContainer: {
    marginBottom: 0
  }
})

export default FeedPost
