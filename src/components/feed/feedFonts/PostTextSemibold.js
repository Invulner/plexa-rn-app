import React, { Component } from 'react'
import { Text } from 'react-native'
import { Font } from 'expo'

class PostTextSemibold extends Component {
  state = {
    fontLoaded: false
  }

  async componentDidMount() {
    await Font.loadAsync({
      'URWGeometric-semibold': require('../../../assets/fonts/URWGeometric-SemiBold.ttf')
    })
    this.setState({
      fontLoaded: true
    })
  }

  render() {
    const { style, children } = this.props
    const { fontLoaded } = this.state

    return (
      <Text style={[style, fontLoaded ? {fontFamily: 'URWGeometric-semibold'} : null]}>
        {children}
      </Text>
    )
  }
}

export default PostTextSemibold
