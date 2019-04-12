import React, { Component } from 'react'
import { TouchableOpacity, StyleSheet, Dimensions, Modal } from 'react-native'
import Image from 'react-native-image-progress'
import Loader from '../common/Loader'

const { width: screenWidth, height: screenHeight } = Dimensions.get('screen')

class ImagePopUp extends Component {
  state = {
    imgHeight: 0,
    imgWidth: 0
  }

  setImageSize = (imgWidth, imgHeight) => {
    this.setState({ imgWidth, imgHeight })
  }

  componentDidMount() {
    Image.getSize(this.props.imageURL, (width, height) => {
      const ratio = width / height
      const calcWidth = screenHeight * ratio
      const calcHeight = screenWidth / ratio
      const imageBiggerThanScreen = width > screenWidth && height > screenHeight
      const imageWiderThanScreen = width > screenWidth
      const imageHigherThanScreen = height > screenHeight

      if (imageBiggerThanScreen && ratio === 1) {
        this.setImageSize(screenWidth, screenWidth)
      }
      else if (imageBiggerThanScreen && ratio > 1) {
        this.setImageSize(screenWidth, calcHeight)
      } else if (imageBiggerThanScreen && ratio < 1) {

        if (calcWidth > screenWidth)
          this.setImageSize(screenWidth, calcHeight)
        else 
          this.setImageSize(calcWidth, screenHeight)

      } else if (imageWiderThanScreen) {
        this.setImageSize(screenWidth, calcHeight)
      } else if (imageHigherThanScreen) {
        this.setImageSize(calcWidth, screenHeight)
      } else {
        this.setImageSize(width, height)
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
        <TouchableOpacity
          style={styles.container}
          onPress={onModalToggle}
          activeOpacity={1}>
          <Image 
            source={{uri: imageURL}}
            indicator={Loader}
            style={{...styles.img, height: imgHeight, width: imgWidth}} />
        </TouchableOpacity>
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
