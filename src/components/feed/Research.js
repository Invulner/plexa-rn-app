import React from 'react'
import { View, StyleSheet } from 'react-native'
import { SemiboldText, RegularText } from '../common/fonts'
import { feedStyles } from '../../assets/styles/feed/feedStyles'
import { PREVIEW_DARK } from '../../assets/styles/colors'
import utils from '../../utils'

function Research(props) {
  const { description, source_title, title } = props.newsItem
  
  return (
    <View>
      <View style={feedStyles.linkContainer}>

        <View style={styles.newsTitleBox}>
          <SemiboldText style={[feedStyles.linkText, styles.newsTitleText]}>
            {title}
          </SemiboldText>
        </View>

        <View style={feedStyles.newsSourceBox}>
          <RegularText style={[styles.linkSource, styles.newsSourceText]}>
            {source_title}
          </RegularText>
        </View>

        <SemiboldText style={[feedStyles.linkText, styles.newsText]}>
          {utils.truncate(description)}
        </SemiboldText>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  newsTitleBox: {
    backgroundColor: PREVIEW_DARK,
    paddingBottom: 12
  },

  newsTitleText: {
    color: '#fff',
    marginLeft: 10,
    paddingBottom: 10
  },

  newsSourceText: {
    color: '#fff'
  },

  newsText: {
    marginLeft: 10,
    marginTop: 15
  }
})

export default Research
