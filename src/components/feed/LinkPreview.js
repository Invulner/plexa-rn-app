import React from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { SemiboldText, RegularText } from '../common/fonts'
import { feedStyles } from '../../assets/styles/feed/feedStyles'

function LinkPreview() {

    return (
      <View>
        <RegularText style={feedStyles.linkCaption}>
          Shared from plexa.ai:
        </RegularText>
        <View style={feedStyles.linkContainer}>
          <Image 
            source={{uri: 'http://via.placeholder.com/400'}}
            style={styles.linkImage}
          />
          <SemiboldText style={feedStyles.linkText}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos qui porro corporis quia dolore voluptate deleniti | BJGP Open
          </SemiboldText>
          <RegularText style={feedStyles.linkSource}>
            bjgpopen.org
          </RegularText>
        </View>
      </View>
    )

}

const styles = StyleSheet.create({
  linkImage: {
    width: '100%',
    resizeMode: 'cover',
    height: 200,
    borderTopLeftRadius: 10
  }
})

export default LinkPreview
