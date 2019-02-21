import React, { Component } from 'react'
import { View, Image, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { RegularText } from '../common/fonts'
import Research from './Research'
import LinkPreview from './LinkPreview'
import Social from './Social'
import { feedStyles } from '../../assets/styles/feed/feedStyles'
import utils from '../../utils'
import News from './News'
import { PostTypes } from '../../constants'
import PostHead from './PostHead'

class FeedPost extends Component {
  areAnyLinkDetails = () => {
    return Object.getOwnPropertyNames(this.props.item.link_details).length !== 0
  }

  renderResearch = () => {
    const { type, item: { news_item } } = this.props

    return <Research newsItem={news_item} type={type} />
  }

  renderNews = () => {
    const { item, type } = this.props

    return <News item={item} type={type} />
  }

  renderLinkDetails = () => {
    const { item, type } = this.props

    return <LinkPreview item={item} type={type} />
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

  render() {
    const { navigation, type, item: { id: postId, created_at, likes_count, answers_count, content, image_urls, author } } = this.props

    return (
      <View style={[feedStyles.postContainer, utils.addStyleForPostScreen(type, {marginBottom: 0})]}>
        <PostHead author={author} created_at={created_at} />
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Post', {postId})}>
          <View>
            {!!content && 
              <RegularText style={feedStyles.linkCaption}>              
                {type === PostTypes.standaloneScreen ? content : utils.truncate(content)}
              </RegularText>
            }
            {!!image_urls.length &&
              <Image 
                source={{uri: image_urls[0].preview_url}}
                style={styles.linkImage} />
            }
            {this.renderAttachedBlock()}
          </View>
        </TouchableWithoutFeedback>
        <Social 
          likesCount={likes_count}
          answersCount={answers_count} />  
      </View>
    )
  }
}

const styles = StyleSheet.create({
  linkImage: {
    ...feedStyles.linkImage,
    marginVertical: 5
  }
})

export default FeedPost
