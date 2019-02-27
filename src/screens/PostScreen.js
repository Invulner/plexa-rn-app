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

const mapStateToProps = (state, { navigation }) => {
  const { feedData } = state.feed
  const { items, loading, areCommentsEnabled } = state.comments
  //As well as profile id from public operations, fallBackId is chosen by convinience
  const fallBackId = 1093
  const post = feedData.filter(post => post.id === navigation.getParam('postId', fallBackId))[0]

  return { 
    items,
    loading,
    post,
    areCommentsEnabled
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
    const { navigation, items, loading, post, areCommentsEnabled } = this.props
    const postAuthor = post.author.full_name

    return (
      <React.Fragment>
        <ScrollView 
          style={styles.container}>
          <FeedPost 
            item={post}
            fullView={true}
            navigation={navigation} /> 
          {loading ?
            <Loader />
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
              {!areCommentsEnabled &&
                <CommentsPlaceholder message={'Author has disabled commenting'}/>
              }
            </React.Fragment>
          }
        </ScrollView>
        {areCommentsEnabled &&
          <ReplyBox author={postAuthor} />
        }
      </React.Fragment>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: BG_COLOR
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(PostScreen)
