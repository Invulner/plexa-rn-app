import React from 'react'
import { View, StyleSheet } from 'react-native'
import { feedStyles } from '../../assets/styles/feed/feedStyles'
import PostHead from '../common/PostHead'
import { RegularText } from '../common/fonts'
import Social from '../common/Social'
import GreyLine from '../common/GreyLine'

function Comment(props) {
  const { created_at, author, content, likes_count, id, liked, deleted } = props.item

  return (
    !deleted &&
      <React.Fragment>
        <GreyLine />
        <View style={styles.container}>
          <PostHead
            created_at={created_at}
            commentId={id}
            postId={props.postId}
            author={author}
            isComment />
          <RegularText style={feedStyles.linkCaption}>
            {content}
          </RegularText>
          <Social
            liked={liked}
            likesCount={likes_count}
            isComment={true}
            id={id} />
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
