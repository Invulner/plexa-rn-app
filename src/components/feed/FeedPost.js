import React, { Component } from 'react'
import { View, Image, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { RegularText } from '../common/fonts'
import Research from './Research'
import LinkPreview from './LinkPreview'
import Social from '../common/Social'
import { feedStyles } from '../../assets/styles/feed/feedStyles'
import utils from '../../utils'
import News from './News'
import PostHead from '../common/PostHead'

class FeedPost extends Component {
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
    const { id: postId, created_at, likes_count, answers_count, image_urls, author } = item

    return (
      <View style={[feedStyles.postContainer, fullView && styles.fullViewContainer]}>

        <PostHead 
          author={author} 
          created_at={created_at} />

        <TouchableWithoutFeedback onPress={() => navigation.navigate('Post', {postId})}>
          <View>
            {this.renderContent()}
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
  },

  fullViewContainer: {
    marginBottom: 0
  }
})

export default FeedPost
