import React, { Component } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import FeedPost from '../components/feed/FeedPost'
import { connect } from 'react-redux'
import { BG_COLOR } from '../assets/styles/colors'
import CommentsOperations from '../operations/CommentsOperations'
import Comment from '../components/comment/Comment'
import SearchPlaceholder from '../components/common/SearchPlaceholder'
import ReplyBox from '../components/common/ReplyBox'
import Loader from '../components/common/Loader'
import GrayLine from '../components/common/GrayLine'
import CommentsActions from '../actions/CommentsActions'
import SafeArea from '../components/common/SafeArea'
import { getSortedComments } from '../selectors/Comments'
import utils from '../utils'

const mapStateToProps = (state, { navigation }) => {
  const { feedData } = state.feed
  const { loading, enabled } = state.comments
  const post = utils.findItemById(feedData, navigation.getParam('postId'))
  const { isConnected } = state.network

  return {
    items: getSortedComments(state),
    loading,
    post,
    enabled,
    isConnected
  }
}

const mapDispatchToProps = (dispatch, { navigation }) => {
  const getComments = () => dispatch(CommentsOperations.getComments(navigation))
  const resetComments = () => dispatch(CommentsActions.resetCommentsData())

  return {
    getComments,
    resetComments
  }
}

class PostScreen extends Component {
  scrollFlag = false

  scrollToEnd = () => {
    this.scrollFlag && this.refs.list.scrollToEnd()
  }

  renderComments = () => {
    const { items, post } = this.props

    if (items.length)
      return items.map(item => <Comment item={item} key={item.id} postId={post.id} />)
    else
      return (
        <React.Fragment>
          <GrayLine />
          <SearchPlaceholder message={'No comments'} />
        </React.Fragment>
      )
  }

  componentDidMount() {
    const { isConnected, getComments } = this.props

    isConnected && getComments()
  }

  componentWillUnmount() {
    this.props.resetComments()
  }

  componentDidUpdate(prevProps) {
    const prevLenght = prevProps.items.length
    const currentLength = this.props.items.length
    const { isConnected, getComments } = this.props

    if (prevLenght !== 0 && prevLenght < currentLength) {
      this.scrollFlag = true
    }

    if (prevProps.isConnected !== isConnected && isConnected) {
      getComments()
    }
  }

  render() {
    const { navigation, items, loading, post, enabled, isConnected } = this.props
    const postAuthor = post.author.full_name

    return (
      <SafeArea>
        <ScrollView
          onContentSizeChange={this.scrollToEnd}
          ref='list'
          style={styles.container}>
          <FeedPost
            fullView
            item={post}
            navigation={navigation} />
          {loading && !items.length ?
            <Loader style={styles.loader} />
            :
            <React.Fragment>
              {isConnected ? 
                this.renderComments()
                :
                <React.Fragment>
                  <GrayLine />
                  <SearchPlaceholder message={'Comments are unavailable in offline mode'} />
                </React.Fragment>
              }
              {enabled === false &&
                <SearchPlaceholder message={'Author has disabled commenting'} />
              }
            </React.Fragment>
          }
        </ScrollView>
        {enabled &&
          <ReplyBox
            type='comment'
            author={postAuthor}
            navigation={navigation} />
        }
      </SafeArea>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: BG_COLOR
  },

  loader: {
    paddingTop: 10
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(PostScreen)
