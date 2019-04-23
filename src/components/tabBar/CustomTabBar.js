import React, { Component } from 'react'
import { View, StyleSheet, SafeAreaView } from 'react-native'
import TabButton from './TabButton'

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

export default CustomTabBar
