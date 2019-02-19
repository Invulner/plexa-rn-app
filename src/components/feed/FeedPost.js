import React, { Component } from 'react'
import { View, Image, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { SemiboldText, RegularText } from '../common/fonts'
import Research from './Research'
import LinkPreview from './LinkPreview'
import Social from './Social'
import { feedStyles } from '../../assets/styles/feed/feedStyles'
import ta from 'time-ago'
import ProfileAvatar from '../common/ProfileAvatar'
import PostActionButton from './PostActionButton'
import utils from '../../utils'
import News from './News'

class FeedPost extends Component {
  areAnyLinkDetails = () => {
    return Object.getOwnPropertyNames(this.props.item.link_details).length !== 0
  }

  renderResearch = () => {
    return (
      <Research newsItem={this.props.item.news_item} />
    )
  }

  renderNews = () => {
    return (
      <News item={this.props.item} />
    )
  }

  renderLinkDetails = () => {
    return (
      <LinkPreview item={this.props.item}/>
    )
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
    const { navigation, item: { created_at, likes_count, answers_count, content, image_urls, author: { avatar_url, full_name, title, id } } } = this.props

    return (
      <View style={styles.postContainer}>
        <View style={styles.userContainer}>

          <TouchableWithoutFeedback onPress={() => navigation.navigate('PublicProfile', {id})}>
            <View>
              <ProfileAvatar 
                url={avatar_url}
                name={full_name} />
            </View>
          </TouchableWithoutFeedback>

          <View>
            <View style={styles.authorRowContainer}>
              <SemiboldText 
                style={styles.postAuthor} 
                onPress={() => navigation.navigate('PublicProfile', {id})}>
                {full_name}
              </SemiboldText>
              <View style={styles.dotImage} />
              <RegularText style={styles.hoursAgo}>
                {ta.ago(created_at, true)}
              </RegularText>
            </View>
            <RegularText style={styles.userDescription}>
              {title}
            </RegularText>
          </View>
          <PostActionButton />   
        </View>
        {!!content && 
          <RegularText style={feedStyles.linkCaption}>
            {utils.truncate(content)}
          </RegularText>
          }
        {!!image_urls.length &&
          <Image 
            source={{uri: image_urls[0].preview_url}}
            style={styles.linkImage} />
        }
        {this.renderAttachedBlock()}
        <Social 
          likesCount={likes_count}
          answersCount={answers_count} />  
      </View>
    )
  }
}

const styles = StyleSheet.create({
  postContainer: {
    paddingTop: 10,
    paddingHorizontal: 10,
    paddingBottom: 5,
    backgroundColor: '#fff',
    marginVertical: 5
  },
  
  userContainer: {
    flexDirection: 'row',
    marginBottom: 15
  },

  postAuthor: {
    fontSize: 18,
    letterSpacing: 0.5,
    fontStyle: 'italic'
  },

  authorRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5
  },

  dotImage: {
    width: 5,
    height: 5,
    borderRadius: 50,
    backgroundColor: 'green',
    marginHorizontal: 10,
    marginBottom: 8,
    backgroundColor: '#ddd'
  },

  hoursAgo: {
    color: '#b4b4b4'
  },

  useruserDescription: {
    fontSize: 14,
    marginTop: -5,
    letterSpacing: 0.5
  },

  linkImage: {
    ...feedStyles.linkImage,
    marginVertical: 5
  }
})

export default FeedPost
