import React, { Component } from 'react'
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  const { isConnected } = state.network

  return { isConnected }
}

class FeedHeaderLeft extends Component {
  render() {
    const { navigation, isConnected } = this.props
    const isFeedScreen = navigation.getParam('isFeedScreen')
    
    return (
      <View style={styles.container}>
      {isFeedScreen &&
        <TouchableOpacity
          disabled={!isConnected} 
          style={styles.addPostButton} 
          onPress={() => navigation.navigate('Compose')}>
          <Image 
            style={styles.addPostIcon}
            source={require('../../../assets/icons/add-post.png')} />
        </TouchableOpacity>
      }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'baseline'
  },
  
  addPostIcon: {
    width: 27,
    height: 27
  },
  
  addPostButton: {
    justifyContent: 'center'
  }
})

export default connect(mapStateToProps, null)(FeedHeaderLeft)
