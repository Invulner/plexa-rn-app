import React, { Component } from 'react'
import { ScrollView, StyleSheet, FlatList, View } from 'react-native'
import FeedPost from '../components/feed/FeedPost'
import { connect } from 'react-redux'
import { PostTypes } from '../constants'
import { BG_COLOR } from '../assets/styles/colors'
import CommentsOperations from '../operations/CommentsOperations'
import Comment from '../components/comment/Comment'
import NoComments from '../components/comment/NoComments'
import ReplyBox from '../components/comment/ReplyBox';

const mapStateToProps = (state) => {
  const { feedData } = state.feed
  const { commentsData } = state.comments

  return { 
    feedData,
    commentsData 
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

  postAuthor = this.getPostById().author.full_name

  getComments = () => {
    if (this.getPostById().answers_count !== 0)
      this.props.getComments()
  }

  componentDidMount() {
    this.getComments()
  }

  componentWillUnmount() {
    this.props.resetComments()
  }

  render() {
    const { navigation, commentsData } = this.props

    return (
      <React.Fragment>
        <ScrollView 
          style={styles.container}
          showsVerticalScrollIndicator={false}>
          <FeedPost 
            item={this.getPostById()}
            type={PostTypes.standaloneScreen}
            navigation={navigation} /> 
          <FlatList 
            data={commentsData}
            keyExtractor={item => item.id + ''}
            renderItem={({ item }) => <Comment item={item} />}
            ListEmptyComponent={<NoComments />} />
        </ScrollView>
        <View style={{marginTop: 'auto'}}>
          <ReplyBox author={this.postAuthor} />
        </View>
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
