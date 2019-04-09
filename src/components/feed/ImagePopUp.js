import React, { Component } from 'react'
import { TouchableOpacity, View, StyleSheet, Dimensions, Modal } from 'react-native'
import Image from 'react-native-image-progress'
import Loader from '../common/Loader'

const screenWidth = Dimensions.get('screen').width

class ImagePopUp extends Component {
  state = {
    imgHeight: 0
  }

  componentDidMount() {
    Image.getSize(this.props.imageURL, (width, height) => {
      const imgHeight = (height * screenWidth) / width
      this.setState({ imgHeight })
    })
  }

  render() {
    const { imageURL, visible, onModalToggle } = this.props
    const { imgHeight } = this.state

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
              style={{...styles.img, height: imgHeight}} />
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
    resizeMode: 'contain'
  }
})

export default ImagePopUp
