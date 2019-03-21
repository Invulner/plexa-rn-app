import React, { Component } from 'react'
import { View, Switch, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { SemiboldText, BoldText } from '../common/fonts'
import { hints } from '../../constants'
import { GRAY } from '../../assets/styles/colors'

class Controls extends Component {
  state = {
    commentsEnabled: true,
    isPublic: true
  }

  showHint = (key) => { 
    Alert.alert(hints[key].title, hints[key].text)
  }

  onToggleSwitch = (key, value) => {
    this.setState({ [key]: value}, () => {
      this.props.onToggle(this.state)
    })
  }

  render() {
    return (
      <React.Fragment>
        <View style={styles.controlBox}>
          <SemiboldText style={styles.label}>
            Replies
          </SemiboldText>

          <TouchableOpacity 
            style={styles.questionBox}
            onPress={() => this.showHint('replies')}>
            <BoldText style={styles.question}>
              ?
            </BoldText>
          </TouchableOpacity>
          <View style={styles.switchBox}>
            <Switch 
              onValueChange={value => this.onToggleSwitch('commentsEnabled', value)}
              value={this.state.commentsEnabled}
              style={styles.switch} />
          </View>
        </View>

        <View style={styles.controlBox}>
          <SemiboldText style={styles.label}>
            Privacy
          </SemiboldText>

          <TouchableOpacity 
            style={styles.questionBox}
            onPress={() => this.showHint('privacy')}>
            <BoldText style={styles.question}>
              ?
            </BoldText>
          </TouchableOpacity>
          <View style={styles.switchBox}>
            <Switch 
              onValueChange={value => this.onToggleSwitch('isPublic', value)}
              value={this.state.isPublic}
              style={styles.switch} />
          </View>
        </View>
      </React.Fragment>
    )
  }
}

const styles = StyleSheet.create({
  controlBox: {
    flexDirection: 'row',
    paddingHorizontal: 10
  },

  label: {
    fontSize: 20,
    marginRight: 7,
    marginTop: 8
  },

  questionBox: {
    width: 20,
    height: 20,
    borderRadius: 20,
    backgroundColor: GRAY,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 6
  },

  question: {
    color: '#fff',
    fontSize: 20,
    marginTop: 2
  },

  switchBox: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row'
  },

  switch: {
    transform: [{ scale: 0.6 }]
  }
})

export default Controls
