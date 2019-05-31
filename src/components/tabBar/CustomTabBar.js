import React, { Component } from 'react'
import { View, StyleSheet, SafeAreaView } from 'react-native'
import TabButton from './TabButton'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  const { unread_count } = state.chats

  return {
    unread_count
  }
}

class CustomTabBar extends Component {
  render() {
    return (
      <SafeAreaView>
        <View style={styles.tabContainer}>
          <TabButton 
            iconType={'feed'} 
            route={'Feed'}
            tabIndex={0} />
          <TabButton 
            iconType={'research'} 
            route={'ResearchFeed'}
            tabIndex={1} />
          <TabButton 
            iconType={'messages'}
            badgeValue={this.props.unread_count}
            route={'Chats'}
            tabIndex={2} />
          <TabButton 
            iconType={'profile'} 
            route={'Profile'}
            tabIndex={3} />
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    height: 45,
    justifyContent: 'space-around',
    overflow: 'hidden',
    borderTopWidth: 1,
    borderTopColor: '#d8d8d8'
  },

  messageIcon: {
    width: 30, 
    resizeMode: 'contain'
  },

  iconBox: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  }
})

export default connect(mapStateToProps)(CustomTabBar)
