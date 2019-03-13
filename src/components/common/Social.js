import React, { Component } from 'react'
import { Image, View, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { LightText } from '../common/fonts'
import { likeIcons } from '../../constants'
import { connect } from 'react-redux'
import CommentsOperations from '../../operations/CommentsOperations'
import FeedOperations from '../../operations/FeedOperations'

const mapStateToProps = (state, { id, isComment }) => {
  const items = isComment ? state.comments.items : state.feed.feedData
  const item = items.filter(item => item.id === id)[0]
  
  return { item }
}

const mapDispatchToProps = (dispatch) => {
  const likeComment = (flag, item) => dispatch(CommentsOperations.updateLike(flag, item))
  const likePost = (flag, item) => dispatch(FeedOperations.updateLike(flag, item))

  return { 
    likeComment,
    likePost
  }
}

class Social extends Component {
  isComment = () => {
    return !!this.props.isComment 
  }

  handleLike = () => {
    const { item, liked } = this.props

    if (this.isComment())
      this.props.likeComment(!liked, item)
    else 
      this.props.likePost(!liked, item)
  }

  getIcon = () => {
    return this.props.liked ? 'liked' : 'unliked'
  }

  render() {
    const { answersCount, likesCount } = this.props
  
    return (
      <View style={styles.socialContainer}>
        <TouchableWithoutFeedback onPress={this.handleLike}>
          <Image 
            source={likeIcons[this.getIcon()]}
            style={styles.icon} />
        </TouchableWithoutFeedback>
        <LightText style={styles.likeCounter}>
          {likesCount}
        </LightText>
        {!!answersCount &&
          <View style={styles.commentsContainer}>
            <Image 
              source={require('../../assets/icons/comments.png')}
              style={styles.icon} />
            <LightText>
              {answersCount}
            </LightText>
          </View>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  icon: {
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

  commentsContainer: {
    flexDirection: 'row', 
    alignItems: 'center'
  },

  likeCounter: {
    marginRight: 30
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Social)
