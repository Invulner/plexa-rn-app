import React, { Component } from 'react'
import { Text } from 'react-native'
import { Font } from 'expo'

class PostTextSemibold extends Component {
  state = {
    fontLoaded: false
  }

  async componentDidMount() {
    await Font.loadAsync({
      'URWGeometric-light': require('../../../assets/fonts/URWGeometric-Light.ttf')
    })
    this.setState({
      fontLoaded: true
    })
  }

  render() {
    const { style, children } = this.props
    const { fontLoaded } = this.state

    return (
      <Text style={[style, fontLoaded ? {fontFamily: 'URWGeometric-light'} : null]}>
        {children}
      </Text>
    )
  }
}

export default PostTextSemibold
