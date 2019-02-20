import React from 'react'
import { View, Image, StyleSheet } from 'react-native'
import { feedStyles } from '../../assets/styles/feed/feedStyles'
import { SemiboldText, RegularText } from '../common/fonts'
import utils from '../../utils'
import { PostTypes } from '../../constants'

function News(props) {
  const { type, item: { link_details, news_item: { description, image, source_title, title } } } = props
  const imageSrc = image || link_details.image

  renderDescription = () => {
    if (type === PostTypes.standaloneScreen) {

      return (
        <RegularText style={[styles.newsText, styles.textOnPostScreen]}>
          {description}
        </RegularText>
      )
    } else {

      return (
        <RegularText style={styles.newsText}>
          {utils.truncate(description)}
        </RegularText>
      )
    }
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
          <RegularText style={[styles.linkSource, styles.newsSourceText]}>
            {source_title}
          </RegularText>
        </View>

        <View>
          <SemiboldText style={[feedStyles.linkText, styles.newsTitleText, type === PostTypes.standaloneScreen && styles.textOnPostScreen]}>
            {title}
          </SemiboldText>
        </View>

        {renderDescription()}
      </View>
    )
}

const styles = StyleSheet.create({
  newsTitleText: {
    marginLeft: 10,
    paddingTop: 3
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
