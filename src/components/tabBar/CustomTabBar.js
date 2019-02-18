import React, { Component } from 'react'
import { View, StyleSheet, SafeAreaView } from 'react-native'
import TabButton from './TabButton'

class CustomTabBar extends Component {
  render() {
    console.log(this.props.navigation.state.index)
    return (
      <SafeAreaView>
        <View style={styles.container}>
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
            route={'Messages'}
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
  container: {
    flexDirection: 'row',
    height: 45,
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#d8d8d8',
    overflow: 'hidden'
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
