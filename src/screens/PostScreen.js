import React, { Component } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import FeedPost from '../components/feed/FeedPost'
import { connect } from 'react-redux'
import { PostTypes } from '../constants'
import { BG_COLOR } from '../assets/styles/colors'
import CommentsOperations from '../operations/CommentsOperations'

const mapStateToProps = (state) => {
  const { feedData } = state.feed

  return { feedData }
}

const mapDispatchToProps = (dispatch, { navigation }) => {
  const getComments = () => dispatch(CommentsOperations.getComments(navigation))

  return { getComments }
}

class PostScreen extends Component {
  getPostById = () => {
    const { navigation, feedData } = this.props
    //As well as profile id from public operations, fallBackId is chosen by convinience
    const fallBackId = 1093
    const postArr = feedData.filter(post => post.id === navigation.getParam('postId', fallBackId))

    return postArr[0]
  }

  componentDidMount() {
    this.props.getComments()
  }

  render() {
    const { navigation } = this.props

    return (
      <ScrollView 
        style={styles.container}
        showsVerticalScrollIndicator={false}>
        <FeedPost 
          item={this.getPostById()}
          type={PostTypes.standaloneScreen}
          navigation={navigation} />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: BG_COLOR
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(PostScreen)
