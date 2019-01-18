import React, { Component } from 'react'
import { View, Image, StyleSheet } from 'react-native'
import { SemiboldText, RegularText } from '../common/fonts'
import Research from './Research'
import LinkPreview from './LinkPreview'
import Social from './Social'
import utils from '../../utils'
import { feedStyles } from '../../assets/styles/feed/feedStyles'
import ta from 'time-ago'

class FeedPost extends Component {
  render() {
    const { newsKind, createdAt, likesCount, commentsEnabled, answersCount, newsItem, linkDetails, content, author: { avatar_url, full_name, title } } = this.props

    return (
      <View style={styles.postContainer}>
        <View style={styles.userContainer}>

          {avatar_url ? 
            <View style={styles.avatarPLaceholder}>
              <Image 
                source={{uri: avatar_url}}
                style={styles.avatarImage}/>
            </View>
            :
            <View style={styles.avatarPLaceholder}>
              <RegularText style={styles.initials}>
                {utils.getInitials(full_name)}
              </RegularText>
            </View>
          }

          <View>
            <View style={styles.authorRowContainer}>
              <SemiboldText style={styles.postAuthor}>
                {full_name}
              </SemiboldText>
              <View style={styles.dotImage} />
              <RegularText style={styles.hoursAgo}>
                {ta.ago(createdAt, true)}
              </RegularText>
            </View>
            <RegularText style={styles.userDescription}>
              {title}
            </RegularText>
          </View>

          <Image
            source={require('../../assets/icons/arrow-down.png')}
            style={styles.hideIcon}
          />

        </View>
        {content ? 
          <RegularText style={feedStyles.linkCaption}>
            {content}
          </RegularText>
          :
          null
        }
        {newsKind === 'research' ?
          <Research 
            newsItem={newsItem}
            content={content}
          />
          :
          null
        }
        {newsKind === 'news' ?
          <RegularText>
            News template placeholder
          </RegularText>
          :
          null
        }
        {Object.getOwnPropertyNames(linkDetails).length !== 0 && newsKind === null ?
          <LinkPreview 
            linkDetails={linkDetails}
            content={content}
          />
          :
          null
        }
        
        <Social 
          likesCount={likesCount}
          commentsEnabled={commentsEnabled}
          answersCount={answersCount}
        />

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

  avatarImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain'
  },

  avatarPLaceholder: {
    width: 80,
    height: 80,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d3a400'
  },

  initials: {
    color: '#fff',
    fontSize: 26,
    paddingTop: 10
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

  hideIcon: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
    marginLeft: 'auto',
    marginTop: 5
  }
})

export default FeedPost
