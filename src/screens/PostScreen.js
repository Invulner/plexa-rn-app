import React, { Component } from 'react'
import { ScrollView, StyleSheet, FlatList, View } from 'react-native'
import FeedPost from '../components/feed/FeedPost'
import { connect } from 'react-redux'
import { PostTypes } from '../constants'
import { BG_COLOR } from '../assets/styles/colors'
import CommentsOperations from '../operations/CommentsOperations'
import Comment from '../components/comment/Comment'
import CommentsMessage from '../components/comment/CommentsMessage'
import ReplyBox from '../components/comment/ReplyBox'
import Loader from '../components/common/Loader'
import TopGreyLine from '../components/comment/TopGreyLine';

const mapStateToProps = (state) => {
  const { feedData } = state.feed
  const { commentsData, loading } = state.comments

  return { 
    feedData,
    commentsData,
    loading
  }
}

const mapDispatchToProps = (dispatch, { navigation }) => {
  const getComments = () => dispatch(CommentsOperations.getComments(navigation))
  const resetComments = () => dispatch(CommentsOperations.resetComments())

  return { 
    getComments,
    resetComments
  }
}

class PostScreen extends Component {
  getPostById = () => {
    const { navigation, feedData } = this.props
    //As well as profile id from public operations, fallBackId is chosen by convinience
    const fallBackId = 1093
    const postArr = feedData.filter(post => post.id === navigation.getParam('postId', fallBackId))

    return postArr[0]
  }

  // getComments = () => {
  //   if (this.getPostById().answers_count !== 0)
  //     this.props.getComments()
  // }

  componentDidMount() {
    this.props.getComments()
  }

  componentWillUnmount() {
    this.props.resetComments()
  }

  render() {
    const { navigation, commentsData, loading } = this.props
    const postAuthor = this.getPostById().author.full_name
    const areCommentsEnabled = this.getPostById().comments_enabled

    return (
      <React.Fragment>
        <ScrollView 
          style={styles.container}>
          <FeedPost 
            item={this.getPostById()}
            type={PostTypes.standaloneScreen}
            navigation={navigation} /> 
          {loading ?
            <Loader />
            :
            <React.Fragment>
              <FlatList 
                data={commentsData}
                keyExtractor={item => item.id + ''}
                renderItem={({ item }) => <Comment item={item} />}
                ListEmptyComponent={(
                  <React.Fragment>
                    <TopGreyLine />
                    <CommentsMessage message={'No comments'} />
                  </React.Fragment>)} />
              {!areCommentsEnabled &&
                <CommentsMessage message={'Author has disabled commenting'}/>
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
