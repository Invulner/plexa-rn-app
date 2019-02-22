import React from 'react'
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import ProfileAvatar from './ProfileAvatar'
import PostActionButton from './PostActionButton'
import { SemiboldText, RegularText } from './fonts'
import { withNavigation } from 'react-navigation'
import ta from 'time-ago'

function PostHead(props) {
  const { navigation, created_at, author: { avatar_url, full_name, title, id } } = props
  return (
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
        <RegularText>
          {title}
        </RegularText>
      </View>
      <PostActionButton />   
    </View>
  )
}

const styles = StyleSheet.create({
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
  }
})

export default withNavigation(PostHead)
