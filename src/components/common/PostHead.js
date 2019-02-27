import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import ProfileAvatar from './ProfileAvatar'
import PostActionButton from './PostActionButton'
import { SemiboldText, RegularText } from './fonts'
import { withNavigation } from 'react-navigation'
import ta from 'time-ago'

function PostHead(props) {
  const { navigation, created_at, author } = props
  const { avatar_url, full_name, title, id } = author
  
  const goToProfile = () => {
    navigation.navigate('PublicProfile', {id})
  }

  const renderAvatar = () => {
    if (full_name === 'Plexa Medbot')
      return (
        <ProfileAvatar 
          url={avatar_url}
          name={full_name} />
      )
    else
      return (
        <TouchableOpacity onPress={goToProfile}>
          <ProfileAvatar 
            url={avatar_url}
            name={full_name} />
        </TouchableOpacity>
      )
  }

  const renderAuthorName = () => {
    if (full_name === 'Plexa Medbot')
      return (
        <SemiboldText style={styles.postAuthor}>
          {full_name}
        </SemiboldText>
      )
    else
      return (
        <TouchableOpacity onPress={goToProfile}>
          <SemiboldText style={styles.postAuthor}>
            {full_name}
          </SemiboldText>
        </TouchableOpacity>
      )
  }

  return (
    <View style={styles.userContainer}>
      {renderAvatar()}
      <View>
        <View style={styles.authorRowContainer}>
          {renderAuthorName()}
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
