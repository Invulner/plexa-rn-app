import React, { Component } from 'react'
import { View, Image, StyleSheet } from 'react-native'
import { SemiboldText, RegularText } from '../common/fonts'
import Social from './Social'
import utils from '../../utils'

class FeedPost extends Component {
  render() {
    const { author, hoursAgo, link } = this.props

    return (
      <View style={styles.postContainer}>
        <View style={styles.userContainer}>

          <View style={styles.avatarPLaceholder}>
            <RegularText style={styles.initials}>
              {utils.getInitials(author)}
            </RegularText>
          </View>

          <View>
            <View style={styles.authorRowContainer}>
              <SemiboldText style={styles.postAuthor}>
                {author}
              </SemiboldText>
              <View style={styles.dotImage} />
              <RegularText style={styles.hoursAgo}>
                {hoursAgo}h
              </RegularText>
            </View>
            <RegularText style={styles.userDescription}>
              ATSI Health Practitioner
            </RegularText>
          </View>

          <Image
            source={require('../../assets/icons/arrow-down.png')}
            style={styles.hideIcon}
          />

        </View>
        {link}
        <Social />
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
