import React, { Component } from 'react'
import { TouchableOpacity, View, StyleSheet, Dimensions, Modal } from 'react-native'
import Image from 'react-native-image-progress'
import Loader from '../common/Loader'

const screenWidth = Dimensions.get('screen').width

class ImagePopUp extends Component {
  render() {
    const { image_urls, visible, onModalToggle } = this.props

    return (
      <Modal        
        animationType="fade"
        transparent={false}
        visible={visible}>
        <View style={styles.container}>
          <TouchableOpacity 
            onPress={onModalToggle}
            activeOpacity={0.8}>
            <Image 
              source={{uri: image_urls[0].url}}
              indicator={Loader}
              style={styles.img} />
          </TouchableOpacity>
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#000'
  },

  img: {
    width: screenWidth, 
    height: 300, 
    resizeMode: 'cover'
  }
})

export default ImagePopUp
