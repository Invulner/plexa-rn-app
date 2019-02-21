import React from 'react'
import { View, StyleSheet } from 'react-native'
import { SemiboldText, RegularText } from '../common/fonts'
import { feedStyles } from '../../assets/styles/feed/feedStyles'
import { PREVIEW_DARK } from '../../assets/styles/colors'
import utils from '../../utils'
import { PostTypes } from '../../constants'

function Research(props) {
  const { type, newsItem: { description, source_title, title } } = props

  renderDescription = () => {
    if (type === PostTypes.standaloneScreen) {

      return (
        <SemiboldText style={[feedStyles.linkText, styles.newsText, feedStyles.textOnPostScreen]}>
          {description}
        </SemiboldText>
      )
    } else {
      return (
        <SemiboldText style={[feedStyles.linkText, styles.newsText]}>
          {utils.truncate(description)}
        </SemiboldText>
      )
    }
  }
  
  return (
    <View>
      <View style={feedStyles.linkContainer}>

        <View style={styles.newsTitleBox}>
          <SemiboldText style={[feedStyles.linkText, styles.newsTitleText, utils.addStyleForPostScreen(type, feedStyles.textOnPostScreen)]}>
            {title}
          </SemiboldText>
        </View>

        <View style={feedStyles.newsSourceBox}>
          <RegularText style={[styles.linkSource, styles.newsSourceText, utils.addStyleForPostScreen(type, feedStyles.sourceOnPostScreen)]}>
            {source_title}
          </RegularText>
        </View>
        {renderDescription()}
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
    marginTop: 15,
    paddingTop: 3
  }
})

export default Research
