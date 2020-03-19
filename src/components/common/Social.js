import React, { Component } from 'react'
import { Image, View, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import { LightText } from '../common/fonts'
import { likeIcons } from '../../constants'
import { connect } from 'react-redux'
import CommentsOperations from '../../operations/CommentsOperations'
import FeedOperations from '../../operations/FeedOperations'
import debounce from 'lodash.debounce'
import DynamicIcon from './DynamicIcon'

const mapStateToProps = (state, { id, isComment }) => {
  const items = isComment ? state.comments.items : state.feed.feedData
  const item = items.filter(item => item.id === id)[0]
  const { isConnected } = state.network

  return { 
    item,
    isConnected
  }
}

const mapDispatchToProps = (dispatch) => {
  const likeComment = (flag, id) => dispatch(CommentsOperations.updateLike(flag, id))
  const likePost = (flag, id) => dispatch(FeedOperations.updateLike(flag, id))

  return {
    likeComment,
    likePost
  }
}

class Social extends Component {
  setPropsToState = () => {
    const { liked, likesCount } = this.props

    return {
      liked: liked,
      likes: likesCount
    }
  }

  state = this.setPropsToState()

  onLikePress = () => {
    this.setState(prevState => ({
      liked: !prevState.liked,
      likes: prevState.liked ? prevState.likes - 1 : prevState.likes + 1
    }), this.updateLike)
  }

  updateLike = debounce(() => {
    const { isComment, likeComment, likePost, id } = this.props
    const { liked } = this.state

    isComment ? likeComment(liked, id) : likePost(liked, id)
  }, 1000)

  componentDidUpdate(prevProps) {
    let { liked: prevLiked, likesCount: prevLikesCount, answersCount: prevAnswersCount } = prevProps
    let { liked, likesCount, answersCount } = this.props

    let likedUpdated = prevLiked !== liked
    let likesCountUpdated = prevLikesCount !== likesCount
    let answersCountUpdated = prevAnswersCount !== answersCount

    if (likedUpdated || likesCountUpdated || answersCountUpdated) {
      this.setState(this.setPropsToState())
    }
  }

  render() {
    const { answersCount, isConnected } = this.props
    const { likes, liked } = this.state

    return (
      <View style={styles.socialContainer}>
        <TouchableOpacity
          activeOpacity={1}
          disabled={!isConnected}
          style={styles.btn} 
          onPress={this.onLikePress}>
          <DynamicIcon
            like={liked}
            src={likeIcons}
            style={styles.icon} />
          <LightText>
            {likes}
          </LightText>
        </TouchableOpacity>
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
  btn: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 20
  },

  icon: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
    marginRight: 7,
    marginBottom: Platform.OS === 'ios'? 8 : -2
  },

  socialContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: Platform.OS === 'ios'? 0 : 5
  },

  commentsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    left: 70
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Social)
