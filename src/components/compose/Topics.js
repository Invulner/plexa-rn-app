import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, ScrollView, View } from 'react-native'
import { connect } from 'react-redux'
import { getSortedTopics } from '../../selectors/Topics'
import { BRAND_DARK, BRAND_LIGHT, DARK_GRAY } from '../../assets/styles/colors'
import { RegularText, SemiboldText } from '../common/fonts'
import PostActions from '../../actions/PostActions'

const mapStateToProps = (state) => {
  const { topic_ids } = state.post

  return {  
    topics: getSortedTopics(state),
    topic_ids
  }
}

const mapDispatchToProps = (dispatch) => {
  const toggleTopic = (id) => dispatch(PostActions.toggleTopic(id))

  return { toggleTopic }
}

class Topics extends Component {
  isTopicChosen = (itemId) => {
    const { topic_ids } = this.props

    return !!topic_ids.includes(itemId)
  }

  onTopicPress = (itemId) => {
    this.props.toggleTopic(itemId)
  }

  renderTopics = () => {
    return this.props.topics.map(item => {

      return (
        <TouchableOpacity
          activeOpacity={0.9}
          style={[styles.topic, this.isTopicChosen(item.id) && styles.topicActive]}
          key={item.id}
          onPress={() => this.onTopicPress(item.id)}>
          <RegularText style={styles.topicText}>
            {item.keyword}
          </RegularText>
        </TouchableOpacity>
      )
    })
  }

  render() {
    return (
      <View style={{maxHeight: 200}}>
        <SemiboldText style={{fontSize: 20, marginLeft: 10, color: DARK_GRAY, marginTop: 10}}>
          Select topics
        </SemiboldText>
        <ScrollView>
          <View style={styles.topicsBox}>
            {this.renderTopics()}
          </View>  
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  topicsBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    justifyContent: 'flex-start',
    marginTop: 10
  },

  topic: {
    justifyContent: 'center',
    paddingHorizontal: 4,
    backgroundColor: BRAND_LIGHT,
    height: 25,
    borderRadius: 5,
    marginRight: 3,
    marginBottom: 3
  },

  topicActive: {
    backgroundColor: BRAND_DARK
  },

  topicText: {
    color: '#fff',
    marginTop: 5
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Topics)
