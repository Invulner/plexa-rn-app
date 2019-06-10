import React, { Component } from 'react'
import { Modal, View, StyleSheet, SafeAreaView, Image, Dimensions, ScrollView, TouchableOpacity } from 'react-native'
import IconChecked from '../common/IconChecked'
import { RegularText } from '../common/fonts'
import { connect } from 'react-redux'
import { BG_COLOR, BRAND_DARK, NATIVE_GRAY } from '../../assets/styles/colors'
import { getSortedTopics } from '../../selectors/Topics'
import { getSortedGroups } from '../../selectors/Groups'
import FeedActions from '../../actions/FeedActions'
import FeedOperations from '../../operations/FeedOperations'
import commonStyles from '../../assets/styles/common'

const mapStateToProps = (state) => {
  const { filterVisible, filter } = state.feed
  const { location, loading } = state.user

  return { 
    filterVisible,
    filter,
    loading,
    location,
    topics: getSortedTopics(state),
    groups: getSortedGroups(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  const toggleFilter = () => dispatch(FeedActions.toggleFilter())
  const refreshFeed = (page, queryParams) => dispatch(FeedOperations.refreshFeed(page, queryParams))
  const toggleFilterItem = (feature, itemId) => dispatch(FeedActions.toggleFilterItem(feature, itemId))
  const clearFilter = () => dispatch(FeedActions.clearFilter())

  return { 
    toggleFilter,
    refreshFeed,
    toggleFilterItem,
    clearFilter
  }
}

class FeedFilter extends Component {
  isFilterChosen = () => {
    const { topic_ids, group_id, location_ids } = this.props.filter

    return !!topic_ids.length || !!group_id || !!location_ids.length
  }

  renderSeparator = () => {
    return (
      <View style={commonStyles.separatorLine} />
    )
  }

  toggleFilterItem = (arr, itemId) => {
    const { topics, groups, location, toggleFilterItem } = this.props
    
    if (arr === topics) {
      toggleFilterItem('topics', itemId)
    } else if (arr === groups) {
      toggleFilterItem('group', itemId)
    } else if (arr === location) {
      toggleFilterItem('locations', itemId)
    }
  }

  onClosePress = () => {
    this.props.toggleFilter()
  }

  onClearPress = () => {
    this.props.clearFilter()
  }

  onApplyPress = () => {
    const { toggleFilter, refreshFeed, filter } = this.props
    
    toggleFilter()
    refreshFeed(filter)
  } 

  renderIconChecked = (filter, itemId) => {
    const { group_id } = this.props.filter

    if (filter !== group_id && filter.includes(itemId) || filter === group_id && group_id === itemId) {
      return <IconChecked />
    }
  }

  renderItems = (arr, field) => {
    const { topics, groups, filter: { topic_ids, location_ids, group_id } } = this.props
    const currentFilter = arr === topics ? topic_ids : (arr === groups ? group_id : location_ids)

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
           {this.renderIconChecked(currentFilter, item.id)}
          </TouchableOpacity>
          {index !== arr.length - 1 && this.renderSeparator()}
        </React.Fragment>
      )
    })
  }

  getHeight = (arrLength) => {
    const otherElementsHeight = 200
    const lists = 3
    const listHeight = (Dimensions.get('screen').height - otherElementsHeight) / lists

    return arrLength >= 3 && {height: listHeight}
  }

  render() {
    const { filterVisible, location, groups, topics, loading } = this.props
    const isFilterChosen = this.isFilterChosen()
    
    return (
      <Modal
        animationType='slide'
        visible={filterVisible}
        transparent={false}>

        <SafeAreaView style={styles.container}>
          {!loading && 

          <React.Fragment>

            <View style={styles.btnBox}>
              <TouchableOpacity onPress={isFilterChosen ? this.onClearPress : this.onClosePress}>
                <RegularText style={styles.title}>
                  {isFilterChosen ? 'Clear' : 'Close'}
                </RegularText>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.onApplyPress}>
                <RegularText style={styles.title}>
                  Apply
                </RegularText>
              </TouchableOpacity>
            </View>
            
            {!!topics && !!topics.length &&
              <React.Fragment>
                <View style={styles.titleBox}>
                  <Image
                    source={require('../../assets/icons/specialties-brand.png')}
                    style={styles.titleIcon} />
                  <RegularText style={styles.title}>
                    Filter by specialty
                  </RegularText>
                </View>

                <View style={this.getHeight(topics.length)}>
                  <ScrollView>
                    {this.renderItems(topics, 'keyword')}
                  </ScrollView>
                </View>
              </React.Fragment>
            }

            {!!groups && !!groups.length &&
              <React.Fragment>
                <View style={styles.titleBox}>
                  <Image
                    source={require('../../assets/icons/user-filter-brand.png')}
                    style={styles.titleIcon} />
                  <RegularText style={styles.title}>
                    Filter by group
                  </RegularText>
                </View>

                <View style={this.getHeight(groups.length)}>
                  <ScrollView>
                    {this.renderItems(groups, 'name')}
                  </ScrollView>
                </View>
              </React.Fragment>
            }

            {!!location && !!location.length &&
              <React.Fragment>
                <View style={styles.titleBox}>
                  <Image
                    source={require('../../assets/icons/location-brand.png')}
                    style={styles.titleIcon} />
                  <RegularText style={styles.title}>
                    Filter by location
                  </RegularText>
                </View>

                <View>
                  {this.renderItems(location, 'name')}
                </View>
              </React.Fragment>
            }

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
