import React, { Component } from 'react'
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { RegularText } from '../common/fonts'
import Research from './Research'
import LinkPreview from './LinkPreview'
import Social from '../common/Social'
import { feedStyles } from '../../assets/styles/feed/feedStyles'
import utils from '../../utils'
import News from './News'
import PostHead from '../common/PostHead'
import ImagePopUp from './ImagePopUp'

class FeedPost extends Component {
  state = {
    modal: false
  }

  onModalToggle = () => {
    this.setState(prevState => ({ modal: !prevState.modal }))
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
    const { link_url, news_kind } = this.props.item

    if (link_url) {
      switch(news_kind) {
        case 'research':
          return this.renderResearch()
        case 'news':
          return this.renderNews()
        case null:
            return this.renderLinkDetails()
        default:
          return null
      }
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

    return (
      <View style={[feedStyles.postContainer, fullView && styles.fullViewContainer]}>
        <TouchableOpacity 
          onPress={() => navigation.navigate('Post', { postId })} 
          activeOpacity={1}>

          {!!image_urls.length &&
            <ImagePopUp
              onModalToggle={this.onModalToggle}
              visible={this.state.modal}
              imageURL={image_urls[0].url} />
          }
          <PostHead
            author={author}
            created_at={created_at}
            postId={postId} />

          <View>
            {this.renderContent()}
            {!!image_urls.length &&
              <TouchableOpacity 
                onPress={this.onModalToggle}
                activeOpacity={0.8}>
                <Image
                  source={{uri: image_urls[0].preview_url}}
                  style={styles.linkImage} />
              </TouchableOpacity>
            }
            {this.renderAttachedBlock()}
          </View>
        </TouchableOpacity>

        <Social
          liked={liked}
          likesCount={likes_count}
          answersCount={answers_count}
          id={postId} />
      </View>
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
