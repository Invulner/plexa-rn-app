import React from 'react'
import { View, StyleSheet } from 'react-native'
import { SemiboldText, RegularText } from '../common/fonts'
import { feedStyles } from '../../assets/styles/feed/feedStyles'
import { PREVIEW_DARK } from '../../assets/styles/colors'
import utils from '../../utils'

function Research(props) {
  const { fullView, data: { description, source_title, title } } = props

  const renderWrapper = (getDescription) => {
    return (
      <SemiboldText style={[feedStyles.linkText, styles.newsText, fullView && feedStyles.textOnPostScreen]}>
        {getDescription(description, fullView)}
      </SemiboldText>
    )
  }
  
  return (
    <View>
      <View style={feedStyles.linkContainer}>

        <View style={styles.newsTitleBox}>
          <SemiboldText style={[feedStyles.linkText, styles.newsTitleText, fullView && feedStyles.textOnPostScreen]}>
            {title}
          </SemiboldText>
        </View>

        <View style={feedStyles.newsSourceBox}>
          <RegularText style={[styles.linkSource, styles.newsSourceText, fullView && feedStyles.sourceOnPostScreen]}>
            {source_title}
          </RegularText>
        </View>
        {renderWrapper(utils.getDescription)}
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
