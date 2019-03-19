import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, Animated } from 'react-native'
import { GRAY } from '../../assets/styles/colors'

class Toggle extends Component {
  knobOffset = 14

  state = {
    isOn: this.props.isOn,
    animatedValue: new Animated.Value(this.props.isOn ? this.knobOffset : 0),
  }

  animate = () => {
    const { animatedValue, isOn } = this.state
    Animated.timing(animatedValue, { 
      toValue: isOn ? this.knobOffset : 0,
      duration: 200
    }).start()
  }

  handlePress = () => {
    this.setState(prevState => ({ isOn: !prevState.isOn }), () => {
      this.animate()
      this.props.onToggle(this.state.isOn)
    })
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevProps.isOn !== this.props.isOn) {
  //     this.setState({isOn: this.props.isOn}, this.animate)
  //   }
  // }

  render() {
    const { isOn, animatedValue } = this.state

    return (
      <TouchableOpacity
        style={[styles.toggleOuter, isOn ? styles.isOn : styles.isOff]}
        onPress={this.handlePress}
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
