import React, { Component } from 'react'
import { Text } from 'react-native'
import { Font } from 'expo'

class PostTextSemibold extends Component {
  state = {
    fontLoaded: false
  }

  async componentDidMount() {
    await Font.loadAsync({
      'URWGeometric-regular': require('../../../assets/fonts/URWGeometric-Regular.ttf')
    })
    this.setState({
      fontLoaded: true
    })
  }

  render() {
    const { style, children } = this.props
    const { fontLoaded } = this.state

    return (
      <Text style={[style, fontLoaded ? {fontFamily: 'URWGeometric-regular'} : null]}>
        {children}
      </Text>
    )
  }
}

export default PostTextSemibold
