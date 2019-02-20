import React, { Component } from 'react'
import { View, Text } from 'react-native'
import FeedPost from '../components/feed/FeedPost'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  const { feedData } = state.feed

  return { feedData }
}

class PostScreen extends Component {
  getPostById = () => {
    const { navigation, feedData } = this.props
    //As well as profile id from public operations, fallBackId is chosen by convinience
    const fallBackId = 1093
    const postArr = feedData.filter(post => post.id === navigation.getParam('postId', fallBackId))

    return postArr[0]
  }

  render() {
    return (
      <FeedPost item={this.getPostById()} />
    )
  }
}

export default connect(mapStateToProps, null)(PostScreen)
