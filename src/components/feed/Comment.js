import React from 'react'
import { View, StyleSheet } from 'react-native'
import { feedStyles } from '../../assets/styles/feed/feedStyles'
import PostHead from './PostHead'
import { RegularText } from '../common/fonts'
import Social from './Social'

function Comment(props) {
  const { created_at, author, content, likes_count } = props.item

  return (
    <React.Fragment>
      <View style={styles.lineBox}>
        <View style={styles.greyLine} />
      </View>
      <View style={styles.container}>
        <PostHead 
          created_at={created_at} 
          author={author} />
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
  },

  greyLine: {
    backgroundColor: '#ccc',
    height: 2,
    width: '100%'
  },

  lineBox: {
    height: 2,
    width: '100%',
    paddingHorizontal: 10,
    backgroundColor: '#fff'
  }
})

export default Comment
