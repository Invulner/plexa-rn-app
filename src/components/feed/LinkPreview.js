import React from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { SemiboldText, RegularText } from '../common/fonts'
import { feedStyles } from '../../assets/styles/feed/feedStyles'

function LinkPreview(props) {
  const { domain, image, title } = props.linkDetails

    return (
      <View>
        <View style={feedStyles.linkContainer}>
          {image &&
            <Image 
              source={{uri: image}}
              style={styles.linkImage} />
          }
          <SemiboldText style={feedStyles.linkText}>
            {title}
          </SemiboldText>
          <RegularText style={feedStyles.linkSource}>
            {domain}
          </RegularText>
        </View>
      </View>
    )

}

const styles = StyleSheet.create({
  linkImage: {
    width: '100%',
    resizeMode: 'cover',
    height: 200
  }
})

export default LinkPreview
