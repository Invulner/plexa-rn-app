import React, { Component } from 'react'
import { Platform, View, Switch, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { connect } from 'react-redux'
import { SemiboldText, BoldText } from '../common/fonts'
import { hints } from '../../constants'
import { GRAY, DARK_GRAY } from '../../assets/styles/colors'
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
  const togglePrivacy = (flag) => dispatch(PostActions.togglePrivacy(flag))

  return {
    toggleComments,
    togglePrivacy
  }
}

class Controls extends Component {
  showHint = (key) => {
    Alert.alert(hints[key].title, hints[key].text)
  }

  render() {
    const { comments_enabled, toggleComments, isPublic, togglePrivacy } = this.props

    return (
      <View style={styles.container}>
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
              onValueChange={flag => togglePrivacy(flag)}
              value={!isPublic}
              style={styles.switch} />
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 100, 
    paddingVertical: 15
  },

  controlBox: {
    flexDirection: 'row',
    paddingHorizontal: 10
  },

  label: {
    fontSize: 20,
    marginRight: 7,
    marginTop: 8,
    color: DARK_GRAY
  },

  questionBox: {
    width: 20,
    height: 20,
    borderRadius: 20,
    backgroundColor: GRAY,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: Platform.OS === 'ios' ? 0 : 2,
    marginTop: Platform.OS === 'ios' ? 6 : 13
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
