import React, { Component } from 'react'
import { FlatList, ActivityIndicator, View, StyleSheet } from 'react-native'
import SafeArea from '../components/common/SafeArea'
import FeedPost from '../components/feed/FeedPost'
import UserOperations from '../operations/UserOperations'
import { connect } from 'react-redux'

const mapDispatchToProps = (dispatch) => {
  const getFeed = () => dispatch(UserOperations.getFeed())

  return { getFeed }
}

const mapStateToProps = (state) => {
  const { feed, feedLoading } = state.user

  return { 
    feed,
    feedLoading
  }
}

class FeedScreen extends Component {
  componentDidMount() {
    this.props.getFeed()
  }

  render() {
    const { feedLoading, feed } = this.props

    return (
      <SafeArea>
        {feedLoading ?
          <View style={styles.indicatorContainer}>
            <ActivityIndicator />
          </View>
          :
          <FlatList 
            data={feed}
            keyExtractor={item => item.id + ''}
            renderItem={({ item }) => (
              <FeedPost
                author={item.author}
                createdAt={item.created_at}
                avatarUrl={item.author.avatar_url}
                likesCount={item.likes_count}
                commentsEnabled={item.comments_enabled}
                answersCount={item.answers_count}
                newsItem={item.news_item}
                linkDetails={item.link_details}
                content={item.content}
                newsKind={item.news_kind}
              />
            )}
          />
        }
      </SafeArea>
    )
  }
}

const styles = StyleSheet.create({
  indicatorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(FeedScreen)
