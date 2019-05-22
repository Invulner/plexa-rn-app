import React, { Component } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import FeedPost from '../components/feed/FeedPost'
import { connect } from 'react-redux'
import { BG_COLOR } from '../assets/styles/colors'
import CommentsOperations from '../operations/CommentsOperations'
import Comment from '../components/comment/Comment'
import CommentsPlaceholder from '../components/comment/CommentsPlaceholder'
import ReplyBox from '../components/common/ReplyBox'
import Loader from '../components/common/Loader'
import GreyLine from '../components/common/GreyLine'
import CommentsActions from '../actions/CommentsActions'
import SafeArea from '../components/common/SafeArea'
import { getSortedComments } from '../selectors/Comments'
import utils from '../utils'

const mapStateToProps = (state, { navigation }) => {
  const { feedData } = state.feed
  const { loading, enabled } = state.comments
  //As well as profile id from public operations, fallBackId is chosen by convinience
  const fallBackId = 1093
  const post = utils.findItemById(feedData, navigation.getParam('postId', fallBackId))

  return {
    items: getSortedComments(state),
    loading,
    post,
    enabled
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
          <GreyLine />
          <CommentsPlaceholder message={'No comments'} />
        </React.Fragment>
      )
  }

  componentDidMount() {
    this.props.getComments()
  }

  componentWillUnmount() {
    this.props.resetComments()
  }

  componentDidUpdate(prevProps) {
    const prevLenght = prevProps.items.length
    const currentLength = this.props.items.length

    if (prevLenght !== 0 && prevLenght < currentLength) {
      this.scrollFlag = true
    }
  }

  render() {
    const { navigation, items, loading, post, enabled } = this.props
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
              {this.renderComments()}
              {!enabled &&
                <CommentsPlaceholder message={'Author has disabled commenting'}/>
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
