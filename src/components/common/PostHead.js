import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import ProfileAvatar from './ProfileAvatar'
import PostActionButton from './PostActionButton'
import { SemiboldText, RegularText } from './fonts'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'
import ta from 'time-ago'

const mapStateToProps = (state) => {
  const { isConnected } = state.network

  return { isConnected }
}

function PostHead(props) {
  const { navigation, created_at, author, isComment, postId, commentId, isConnected } = props
  const { avatar_url, full_name, title, id } = author
  
  const handlePress = () => {
    return isMedbot() || !isConnected ? null : navigation.navigate('PublicProfile', { id })
  }

  const getBtnOpacity = () => {
      return isMedbot() || !isConnected ? 1 : 0.2
  }

  const isMedbot = () => {
    return full_name === 'Plexa Medbot'
  }

  renderTouchableBlock = (component) => {
    return (
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={getBtnOpacity()}>
        {component}
      </TouchableOpacity>
    )
  }

  const name = (
    <SemiboldText style={styles.postAuthor}>
      {full_name}
    </SemiboldText>
  )

  const avatar = (
    <ProfileAvatar 
      url={avatar_url}
      name={full_name}
      size={isComment ? 'medium' : 'default'} />
  )

  const calculateTime = () => {
    const second = 1000
    
    if (Date.now() - new Date(created_at).getTime() < second) 
      return '1s' 
    else 
      return ta.ago(created_at, true)
  }

  return (
    <View style={styles.userContainer}>
      {renderTouchableBlock(avatar)}
      <View>
        <View style={styles.authorRowContainer}>
          {renderTouchableBlock(name)}
          <View style={styles.dotImage} />
          <RegularText style={styles.hoursAgo}>
            {calculateTime()}
          </RegularText>
        </View>
        <RegularText>
          {title}
        </RegularText>
      </View>
      <PostActionButton 
        isMedbot={isMedbot()} 
        postId={postId}
        commentId={commentId}
        authorId={id}
        navigation={navigation} />
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
    marginTop: 2
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

export default withNavigation(connect(mapStateToProps)(PostHead))
