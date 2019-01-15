import React, { Component } from 'react'
import { FlatList } from 'react-native'
import SafeArea from '../components/common/SafeArea'
import getAxiosInstance from '../config/axios'
import FeedPost from '../components/feed/FeedPost'
import ScrollArea from '../components/common/ScrollArea'
import NewsPreview from '../components/feed/NewsPreview'
import LinkPreview from '../components/feed/LinkPreview'
import NewsPost from '../components/feed/NewsPost'


class FeedScreen extends Component {

  componentDidMount() {
    getAxiosInstance()
      .then(api => {
        api.get('https://staging.plexa.ai/api/v1/feed')
          .then(res => console.log(res))
          .then(err => console.log(err))
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <SafeArea>
        <ScrollArea>
          <FeedPost 
            author='Qest Provider' 
            hoursAgo='17'
            link={<NewsPreview />}
          />
          <NewsPost />
          <FeedPost 
            author='Irina' 
            hoursAgo='5'
            link={<LinkPreview />}
          />
        </ScrollArea>
      </SafeArea>
    )
  }
}

export default FeedScreen
