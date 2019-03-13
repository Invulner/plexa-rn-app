import React, { Component } from 'react'
import { Image, View, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { LightText } from '../common/fonts'
import { likeIcons } from '../../constants'
import { connect } from 'react-redux'
import CommentsOperations from '../../operations/CommentsOperations'
import FeedOperations from '../../operations/FeedOperations'

const mapStateToProps = (state, { id, isComment }) => {
  let item
  let index

  if (isComment) {
    const { items } = state.comments
    item = items.filter(item => item.id === id)[0]
    index = items.findIndex(item => item.id === id)
  } else {
    const { feedData } = state.feed
    item = feedData.filter(item => item.id === id)[0]
    index = feedData.findIndex(item => item.id === id)
  }

  return { 
    item,
    index
  }
}

const mapDispatchToProps = (dispatch) => {
  const likeComment = (flag, item, index) => dispatch(CommentsOperations.updateLike(flag, item, index))
  const likePost = (flag, item, index) => dispatch(FeedOperations.updateLike(flag, item, index))

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
    const { item, index, liked } = this.props

    if (this.isComment())
      this.props.likeComment(!liked, item, index)
    else 
      this.props.likePost(!liked, item, index)
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
