import React, { Component } from 'react'
import { ImageBackground, TouchableOpacity, Image, StyleSheet, View } from 'react-native'
import { GRAY } from '../../assets/styles/colors'

class Photo extends Component {
  render() {
    const { onClose, imageSrc } = this.props

    return (
      <View style={styles.imgBox}>
        <ImageBackground 
          style={styles.img}
          source={{uri: imageSrc}}>
          <TouchableOpacity
            style={styles.iconBox} 
            onPress={onClose}>
            <Image 
              source={require('../../assets/icons/delete.png')}
              style={styles.closeIcon} />
          </TouchableOpacity>
        </ImageBackground>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  imgBox: {
    paddingHorizontal: 20,  
    width: '100%',
    minHeight: 100,
    flex: 1
  },

  img: {
    resizeMode: 'cover',
    flex: 1
  },

  closeIcon: {
    width: 7,
    height: 7,
    resizeMode: 'contain'
  },

  iconBox: {
    position: 'absolute',
    top: 10,
    right: 10, 
    width: 15, 
    height: 15, 
    borderRadius: 15, 
    backgroundColor: GRAY,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default Photo
