import React from 'react'
import { View, StyleSheet } from 'react-native'
import { feedStyles } from '../../assets/styles/feed/feedStyles'
import PostHead from '../common/PostHead'
import { RegularText } from '../common/fonts'
import Social from '../common/Social'
import TopGreyLine from './TopGreyLine'

function Comment(props) {
  const { created_at, author, content, likes_count } = props.item

  return (
    <React.Fragment>
      <TopGreyLine />
      <View style={styles.container}>
        <PostHead 
          created_at={created_at} 
          author={author}
          isComment />
        <RegularText style={feedStyles.linkCaption}>              
          {content}
        </RegularText>
        <Social likesCount={likes_count} />  
      </View>
    </React.Fragment>
  )
}

const styles = StyleSheet.create({
  container: {
    ...feedStyles.postContainer,
    marginTop: 0,
    marginBottom: 0
  }
})

export default Comment
