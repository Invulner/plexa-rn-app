import React, { Component } from 'react'
import { View, Switch, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { connect } from 'react-redux'
import { SemiboldText, BoldText } from '../common/fonts'
import { hints } from '../../constants'
import { GRAY } from '../../assets/styles/colors'
import PostActions from '../../actions/PostActions'

const mapStateToProps = (state) => {
  const { comments_enabled, public: isPublic } = state.post

  return {
    comments_enabled,
    isPublic
  }
}

const mapDispatchToProps = (dispatch) => {
  const toggleComments = (flag) => dispatch(PostActions.toggleComments(flag))
  const toggleVisibility = (flag) => dispatch(PostActions.toggleVisibility(flag))

  return {
    toggleComments,
    toggleVisibility
  }
}

class Controls extends Component {
  // mapPropsToState = () => {
  //   const { commentsEnabled, isPublic } = this.props.values

  //   return {
  //     commentsEnabled,
  //     isPublic
  //   }
  // }

  // state = this.mapPropsToState()

  showHint = (key) => { 
    Alert.alert(hints[key].title, hints[key].text)
  }

  // onToggleSwitch = (key, value) => {
  //   this.setState({ [key]: value}, () => {
  //     this.props.onToggle(this.state)
  //   })
  // }

  render() {
    const { comments_enabled, toggleComments, isPublic, toggleVisibility } = this.props

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
              onValueChange={flag => toggleComments(flag)}
              value={comments_enabled}
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
              onValueChange={flag => toggleVisibility(flag)}
              value={isPublic}
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
    marginTop: 8,
    color: '#4c4c4c'
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

export default connect(mapStateToProps, mapDispatchToProps)(Controls)
