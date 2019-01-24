import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { SemiboldText, RegularText } from '../common/fonts'
import Research from './Research'
import LinkPreview from './LinkPreview'
import Social from './Social'
import { feedStyles } from '../../assets/styles/feed/feedStyles'
import ta from 'time-ago'
import ProfileAvatar from '../common/ProfileAvatar'
import PostActionButton from './PostActionButton'

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
      <Text>
        Placeholder for the shared news preview
      </Text>
    )
  }

  renderLinkDetails = () => {
    return (
      <LinkPreview linkDetails={this.props.item.link_details} />
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
    const { created_at, likes_count, answers_count, content, author: { avatar_url, full_name, title } } = this.props.item

    return (
      <View style={styles.postContainer}>
        <View style={styles.userContainer}>

          <ProfileAvatar 
            url={avatar_url}
            name={full_name} />

          <View>
            <View style={styles.authorRowContainer}>
              <SemiboldText style={styles.postAuthor}>
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
            {content}
          </RegularText>
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
  }
})

export default FeedPost
