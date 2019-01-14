import React, { Component } from 'react'
import { View, Image, StyleSheet } from 'react-native'
import PostTextSemibold from './feedFonts/PostTextSemibold'
import PostTextRegular from './feedFonts/PostTextRegular'
import SharedPreview from './SharedPreview'
import PostTextLight from './feedFonts/PostTextLight'

class UserPost extends Component {
  render() {
    return (
      <View style={styles.postContainer}>
        <View style={styles.userContainer}>

          <Image 
            source={{uri: 'http://via.placeholder.com/80'}}
            style={styles.postImage}
          />

          <View>
            <View style={styles.authorRowContainer}>
              <PostTextSemibold style={styles.postAuthor}>
                Qest Provider
              </PostTextSemibold>
              <View style={styles.dotImage} />
              <PostTextRegular style={styles.hoursAgo}>
                17h
              </PostTextRegular>
            </View>
            <PostTextRegular style={styles.userDescription}>
              ATSI Health Practitioner
            </PostTextRegular>
          </View>

          <Image
            source={require('../../assets/icons/arrow-down.png')}
            style={styles.hideIcon}
          />

        </View>

        <PostTextRegular style={styles.linkCaption}>
          Shared from plexa.ai:
        </PostTextRegular>
        <SharedPreview />
        <View style={styles.socialContainer}>
        <Image 
          source={require('../../assets/icons/like-icon.png')}
          style={styles.likeIcon}
        />
        <PostTextLight>
          0
        </PostTextLight>
        </View>
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
    marginVertical: 10
  },
  
  userContainer: {
    flexDirection: 'row',
    marginBottom: 15
  },

  postImage: {
    width: 80,
    height: 80,
    marginRight: 10
  },

  postAuthor: {
    fontSize: 18,
    letterSpacing: 0.5
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

  linkCaption: {
    fontSize: 18
  },

  likeIcon: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
    marginRight: 7,
    marginLeft: 10,
    marginBottom: 8
  },

  socialContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10
  },

  hideIcon: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
    marginLeft: 'auto'
  }
})

export default UserPost
