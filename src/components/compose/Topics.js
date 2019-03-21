import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, ScrollView, View } from 'react-native'
import { connect } from 'react-redux'
import { getSortedTopics } from '../../selectors/Topics'
import { BRAND_DARK, BRAND_LIGHT } from '../../assets/styles/colors'
import { RegularText } from '../common/fonts'

const mapStateToProps = (state) => {
  return {  
    topics: getSortedTopics(state)
  }
}

class Topics extends Component {
  state = {
    topicIDs: []
  }

  isTopicChosen = (itemId) => {
    const { topicIDs } = this.state

    return !!topicIDs.includes(itemId)
  }

  onTopicPress = (itemId) => {
    this.setState(prevState => {

      if (!prevState.topicIDs.includes(itemId))
        return {
          topicIDs: [
            ...prevState.topicIDs,
            itemId
          ]
        }
      else 
        return {
          topicIDs: prevState.topicIDs.filter(id => id !== itemId)
        }
    }, () => this.props.onTopicPress(this.state.topicIDs))
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
      <ScrollView>
        <View style={styles.topicsBox}>
          {this.renderTopics()}
        </View>  
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  topicsBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    justifyContent: 'flex-start',
    marginTop: 20
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

export default connect(mapStateToProps, null)(Topics)
