import React from 'react'
import { View, Image, StyleSheet } from 'react-native'
import { feedStyles } from '../../assets/styles/feed/feedStyles'
import { SemiboldText, RegularText } from '../common/fonts'
import utils from '../../utils'

function News(props) {
  const { link_details, news_item: { description, image, source_title, title } } = props.item
  const imageSrc = image || link_details.image

    return (
      <View style={feedStyles.linkContainer}>

        {imageSrc ? 
          <Image 
            style={styles.image} 
            source={{uri: imageSrc}} />
          :
          <View style={styles.blankView}/>
        }

        <View style={feedStyles.newsSourceBox}>
          <RegularText style={[styles.linkSource, styles.newsSourceText]}>
            {source_title}
          </RegularText>
        </View>

        <View>
          <SemiboldText style={[feedStyles.linkText, styles.newsTitleText]}>
            {title}
          </SemiboldText>
        </View>

        <RegularText style={styles.newsText}>
          {utils.truncate(description)}
        </RegularText>
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
  }
})

export default News
