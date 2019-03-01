import React from 'react'
import { View, Image, StyleSheet } from 'react-native'
import { feedStyles } from '../../assets/styles/feed/feedStyles'
import { SemiboldText, RegularText } from '../common/fonts'
import utils from '../../utils'

function News(props) {
  const { fullView, item } = props
  const { link_details, news_item } = item
  const { description, image, source_title, title } = news_item
  const imageSrc = image || link_details.image

  const renderWrapper = () => {
    return (
      <RegularText style={[styles.newsText, fullView && feedStyles.textOnPostScreen]}>
        {utils.getDescription(description, fullView)}
      </RegularText>
    )
  }

    return (
      <View style={feedStyles.linkContainer}>

        {imageSrc ? 
          <Image 
            style={styles.image} 
            source={{uri: imageSrc}} />
          :
          <View style={styles.blankView} />
        }

        <View style={feedStyles.newsSourceBox}>
          <RegularText style={[styles.newsSourceText, fullView && feedStyles.sourceOnPostScreen]}>
            {source_title}
          </RegularText>
        </View>

        <View>
          <SemiboldText style={[feedStyles.linkText, styles.newsTitleText, fullView && feedStyles.textOnPostScreen]}>
            {title}
          </SemiboldText>
        </View>
        {renderWrapper()}
      </View>
    )
}

const styles = StyleSheet.create({
  newsTitleText: {
    marginLeft: 10
  },

  newsSourceText: {
    color: '#fff'
  },

  newsText: {
    marginLeft: 10,
    marginTop: 7,
    fontSize: 15
  },

  image: {
    height: 200,
    resizeMode: 'cover'
  },

  blankView: {
    height: 25,
  },

  textOnPostScreen: {
    fontSize: 18
  }
})

export default News
