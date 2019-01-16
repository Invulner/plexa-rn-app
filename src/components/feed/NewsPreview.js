import React from 'react'
import { View, StyleSheet } from 'react-native'
import { SemiboldText, RegularText } from '../common/fonts'
import { feedStyles } from '../../assets/styles/feed/feedStyles'

function NewsPreview() {
  return (
    <View>
      <RegularText style={feedStyles.linkCaption}>
        Lorem ipsum dolor sit amet consectetur.
      </RegularText>
      <View style={feedStyles.linkContainer}>

        <View style={styles.newsTitleBox}>
          <SemiboldText style={[feedStyles.linkText, styles.newsTitleText]}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cupiditate obcaecati assumenda.
          </SemiboldText>
        </View>

        <View style={styles.newsSourceBox}>
          <RegularText style={[styles.linkSource, styles.newsSourceText]}>
            Internationsl Journal of Epidemiology
          </RegularText>
        </View>

        <SemiboldText style={[feedStyles.linkText, styles.newsText]}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum tenetur minima doloribus eveniet aut. Error dicta dolorem vero fuga cupiditate excepturi dolor quam odit, voluptate reiciendis, numquam et sint eveniet alias animi nisi nulla fugiat dolorum saepe eligendi corporis nesciunt.
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

export default NewsPreview
