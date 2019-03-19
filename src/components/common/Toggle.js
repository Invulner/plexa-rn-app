import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, Animated } from 'react-native'
import { GRAY } from '../../assets/styles/colors'

class Toggle extends Component {
  state = {
    isOn: false,
    animatedValue: new Animated.Value(0),
  }

  animate = () => {
    const { animatedValue, isOn } = this.state
    Animated.timing(animatedValue, { 
      toValue: isOn ? 14 : 0,
      duration: 200
    }).start()
  }

  toggleHandle = () => {
    this.setState(prevState => ({ isOn: !prevState.isOn }), this.animate)
  }

  render() {
    const { isOn, animatedValue } = this.state

    return (
      <TouchableOpacity
        style={[styles.toggleOuter, isOn ? styles.isOn : styles.isOff]}
        onPress={this.toggleHandle}
        activeOpacity={1}>
        <Animated.View style={[styles.knob, { transform: [{translateX: animatedValue}] }]} />
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  toggleOuter: {
    width: 30,
    height: 16,
    borderRadius: 31,
    padding: 2
  },

  isOn: {
    backgroundColor: 'green'
  },

  isOff: {
    backgroundColor: GRAY
  },

  knob: {
    width: 12,
    height: 12,
    borderRadius: 32,
    backgroundColor: '#fff'
  }
})

export default Toggle
