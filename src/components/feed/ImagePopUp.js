import React, { Component } from 'react'
import { TouchableOpacity, View, StyleSheet, Dimensions, Modal } from 'react-native'
import Image from 'react-native-image-progress'
import Loader from '../common/Loader'

const { width: screenWidth, height: screenHeight } = Dimensions.get('screen')

class ImagePopUp extends Component {
  state = {
    imgHeight: 0,
    imgWidth: 0
  }

  componentDidMount() {
    Image.getSize(this.props.imageURL, (width, height) => {
      if (width > screenWidth && height > screenHeight && width > height || width > screenWidth) {
        this.setState({ imgWidth: screenWidth, imgHeight: height * screenWidth / width })
      } else if (height > screenHeight && width > screenWidth && height > width || height > screenHeight) {
        this.setState({ imgHeight: screenHeight, imgWidth: screenWidth * height / width})
      } else {
        this.setState({ imgWidth: width, imgHeight: height })
      }
    })
  }

  render() {
    const { imageURL, visible, onModalToggle } = this.props
    const { imgHeight, imgWidth } = this.state

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
              source={{uri: imageURL}}
              indicator={Loader}
              style={{...styles.img, height: imgHeight, width: imgWidth}} />
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
    resizeMode: 'contain'
  }
})

export default ImagePopUp
