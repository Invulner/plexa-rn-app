import React, { Component } from 'react'
import { ScrollView, StyleSheet, FlatList } from 'react-native'
import FeedPost from '../components/feed/FeedPost'
import { connect } from 'react-redux'
import { BG_COLOR } from '../assets/styles/colors'
import CommentsOperations from '../operations/CommentsOperations'
import Comment from '../components/comment/Comment'
import CommentsPlaceholder from '../components/comment/CommentsPlaceholder'
import ReplyBox from '../components/comment/ReplyBox'
import Loader from '../components/common/Loader'
import TopGreyLine from '../components/comment/TopGreyLine'
import CommentsActions from '../actions/CommentsActions'
import SafeArea from '../components/common/SafeArea'
import { createSelector } from 'reselect'

const getSortedComments = createSelector(
  state => state.comments.items,
  (items) => items.sort(sortByTime)
)

const sortByTime = (a, b) => {
  const date1 = new Date(a.created_at)
  const date2 = new Date(b.created_at)

  return (date1.getTime() - date2.getTime()) < 0 ? -1 : 1
}

const mapStateToProps = (state, { navigation }) => {
  const { feedData } = state.feed
  const { loading, enabled } = state.comments
  //As well as profile id from public operations, fallBackId is chosen by convinience
  const fallBackId = 1093
  const post = feedData.filter(post => post.id === navigation.getParam('postId', fallBackId))[0]

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
  componentDidMount() {
    this.props.getComments()
  }

  componentWillUnmount() {
    this.props.resetComments()
  }

  render() {
    const { navigation, items, loading, post, enabled } = this.props
    const postAuthor = post.author.full_name

    return (
      <SafeArea>
        <ScrollView 
          style={styles.container}>
          <FeedPost 
            fullView
            item={post}
            navigation={navigation} /> 
          {loading && !items.length ?
            <Loader style={styles.loader} />
            :
            <React.Fragment>
              <FlatList 
                data={items}
                keyExtractor={item => item.id + ''}
                renderItem={({ item }) => <Comment item={item} />}
                ListEmptyComponent={(
                  <React.Fragment>
                    <TopGreyLine />
                    <CommentsPlaceholder message={'No comments'} />
                  </React.Fragment>)} />
              {!enabled &&
                <CommentsPlaceholder message={'Author has disabled commenting'}/>
              }
            </React.Fragment>
          }
        </ScrollView>
        {enabled &&
          <ReplyBox 
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
