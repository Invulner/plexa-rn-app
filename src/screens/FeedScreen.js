import React, { Component } from 'react'
import { View, Text } from 'react-native'
import SafeArea from '../components/common/SafeArea'
import getAxiosInstance from '../config/axios'
import UserPost from '../components/feed/UserPost'

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
        <UserPost />
      </SafeArea>
    )
  }
}

export default FeedScreen
