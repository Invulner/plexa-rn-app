import React, { Component } from 'react'
import { Modal, View, StyleSheet, SafeAreaView, Image, Dimensions, ScrollView, TouchableOpacity } from 'react-native'
import IconChecked from '../common/IconChecked'
import { RegularText } from '../common/fonts'
import { connect } from 'react-redux'
import FeedActions from '../../actions/FeedActions'
import { BG_COLOR, BRAND_DARK, NATIVE_GRAY } from '../../assets/styles/colors'
import { getSortedTopics } from '../../selectors/Topics'
import { getSortedGroups } from '../../selectors/Groups'

const mapStateToProps = (state) => {
  const { filterVisible } = state.feed
  const { location, loading } = state.user

  return { 
    filterVisible,
    loading,
    location,
    topics: getSortedTopics(state),
    groups: getSortedGroups(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  const toggleFilter = () => dispatch(FeedActions.toggleFilter())

  return { toggleFilter }
}

class FeedFilter extends Component {
  state = {
    topic_ids: [],
    group_id: null,
    location_ids: []
  }

  renderSeparator = () => {
    return (
      <View style={{ backgroundColor: NATIVE_GRAY, width: '100%', height: 1 }} />
    )
  }

  toggleFilterItem = (arr, itemId) => {
    const { topics, groups, location } = this.props
    
    if (arr === topics) {
      this.setState(prevState => {
        if (prevState.topic_ids.includes(itemId)) {
          return { topic_ids: prevState.topic_ids.filter(id => id !== itemId) }
        } else {
          return { topic_ids: [...prevState.topic_ids, itemId] }
        }
      }, () => console.log('this.state.topic_ids', this.state.topic_ids))
    } else if (arr === groups) {
      this.setState(prevState => {
        if (itemId !== prevState.group_id) {
          return { group_id: itemId }
        } else {
          return { group_id: null }
        }
      }, () => console.log('this.state.group_id', this.state.group_id))
    } else if (arr === location) {
      this.setState(prevState => {
        if (prevState.location_ids.includes(itemId)) {
          return { location_ids: prevState.location_ids.filter(id => id !== itemId) }
        } else {
          return { location_ids: [...prevState.location_ids, itemId] }
        }
      }, () => console.log('this.state.location_ids', this.state.location_ids))
    }
  }

  onClearPress = () => {
    this.setState({
      topic_ids: [],
      group_id: null,
      location_ids: []
    })
  }

  renderIconChecked = (arr, itemId) => {
    const { topics, location, groups } = this.props
    const isTopicSelected = arr === topics && this.state.topic_ids.includes(itemId)
    const isGroupSelected = arr === groups && this.state.group_id === itemId
    const isLocationSelected = arr === location && this.state.location_ids.includes(itemId)

    if (isTopicSelected || isGroupSelected || isLocationSelected) return <IconChecked />
  }

  renderItems = (arr, field) => {
    return arr.map((item, index, arr) => {
      return (
        <React.Fragment key={item.id} >
          <TouchableOpacity
            onPress={() => this.toggleFilterItem(arr, item.id)} 
            style={styles.filterItem}>
            <RegularText
              style={styles.itemText}>
              {item[field]}
            </RegularText>
           {this.renderIconChecked(arr, item.id)}
          </TouchableOpacity>
          {index !== arr.length - 1 && this.renderSeparator()}
        </React.Fragment>
      )
    })
  }

  getHeight = (arrLength) => {
     //Make ScrollView areas take up empty space on screen
     const otherElementsHeight = 200
     const scrollViewAreas = 3
     const listHeight = (Dimensions.get('screen').height - otherElementsHeight) / scrollViewAreas
    return arrLength >= 3 && {height: listHeight}
  }

  render() {
    const { filterVisible, toggleFilter, location, groups, topics, loading } = this.props
    
    return (
      <Modal
        animationType='slide'
        visible={filterVisible}
        transparent={false}>

        <SafeAreaView style={styles.container}>
          {!loading && 

          <React.Fragment>

            <View style={styles.btnBox}>
              <TouchableOpacity onPress={this.onClearPress}>
                <RegularText style={styles.title}>
                  Clear
                </RegularText>
              </TouchableOpacity>
              <TouchableOpacity onPress={toggleFilter}>
                <RegularText style={styles.title}>
                  Apply
                </RegularText>
              </TouchableOpacity>
            </View>

            <View style={styles.titleBox}>
              <Image
                source={require('../../assets/icons/specialties-brand.png')}
                style={styles.titleIcon} />
              <RegularText style={styles.title}>Filter by specialty</RegularText>
            </View>

            <View style={this.getHeight(topics.length)}>
              <ScrollView>
                {this.renderItems(topics, 'keyword')}
              </ScrollView>
            </View>

            <View style={styles.titleBox}>
              <Image
                source={require('../../assets/icons/user-filter-brand.png')}
                style={styles.titleIcon} />
              <RegularText style={styles.title}>Filter by group</RegularText>
            </View>

            <View style={this.getHeight(groups.length)}>
              <ScrollView>
                {this.renderItems(groups, 'name')}
              </ScrollView>
            </View>

            <View style={styles.titleBox}>
              <Image
                source={require('../../assets/icons/location-brand.png')}
                style={styles.titleIcon} />
              <RegularText style={styles.title}>Filter by location</RegularText>
            </View>

            <View style={this.getHeight(location.length)}>
              <ScrollView>
                {this.renderItems(location, 'name')}
              </ScrollView>
            </View>
          </React.Fragment>
          }
          
        </SafeAreaView>

      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR
  },

  filterItem: {
    height: 40, 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    flexDirection: 'row',
    paddingHorizontal: 10,
    backgroundColor: '#fff'
  },

  titleBox: {
    padding: 10, 
    flexDirection: 'row', 
    alignItems: 'center'
  },

  titleIcon: {
    width: 20, 
    height: 20, 
    marginRight: 10,
    resizeMode: 'contain'
  },

  title: {
    color: BRAND_DARK, 
    fontSize: 20, 
    marginTop: 10
  },

  itemText: {
    fontSize: 18, 
    marginTop: 7
  },

  btnBox: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: NATIVE_GRAY
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(FeedFilter)
