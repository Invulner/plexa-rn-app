import React from 'react'
import { View, StyleSheet } from 'react-native'
import { SemiboldText, RegularText } from '../common/fonts'
import { feedStyles } from '../../assets/styles/feed/feedStyles'

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

        <View style={styles.newsSourceBox}>
          <RegularText style={[styles.linkSource, styles.newsSourceText]}>
            {source_title}
          </RegularText>
        </View>

        <SemiboldText style={[feedStyles.linkText, styles.newsText]}>
          {description}
        </SemiboldText>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  newsTitleBox: {
    backgroundColor: '#085d24',
    paddingBottom: 10
  },

  newsTitleText: {
    color: '#fff',
    marginLeft: 10
  },

  newsSourceBox: {
    backgroundColor: '#00a453',
    flex: -1,
    padding: 10,
    paddingBottom: 5,
    marginLeft: 10,
    marginTop: -15,
    marginRight: 'auto'
  },

  newsSourceText: {
    color: '#fff'
  },

  newsText: {
    marginLeft: 10,
    marginTop: 10
  }
})

export default Research
