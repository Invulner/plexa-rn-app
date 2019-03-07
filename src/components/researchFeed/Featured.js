import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity, Linking } from 'react-native'
import { BRAND_LIGHT } from '../../assets/styles/colors'
import NewsIcon from '../feed/NewsIcon'
import { RegularText } from '../common/fonts'
import { FEATURED } from '../../assets/styles/colors'

class Featured extends Component {
  getColorIndex = () => {
    return Math.floor(Math.random() * (FEATURED.length - 1))
  }

  colorIndex = this.getColorIndex()

  render() {
    const { source_title, title, description, url } = this.props.item
    const colorIndex = this.colorIndex

    return (
      <View style={[styles.newsContainer, {backgroundColor: FEATURED[colorIndex].bg}]}>
        <View style={styles.topBox}> 
          <View style={styles.iconBox}>
            <NewsIcon style={styles.icon} />
          </View>
          <TouchableOpacity style={styles.btn}>
            <RegularText style={styles.btnText}>
              Post this
            </RegularText>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => Linking.openURL(url)}>
          <RegularText style={styles.newsTitle}>
            {title}
          </RegularText>
        </TouchableOpacity>
        <View style={[styles.sourceContainer, {backgroundColor: FEATURED[colorIndex].source}]}>
          <RegularText style={styles.sourceText}>
            {source_title}
          </RegularText>
        </View>
        <RegularText style={styles.newsText}>
          {description}
        </RegularText>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  newsContainer: {
    backgroundColor: '#581060',
    padding: 10,
    marginVertical: 5
  },

  topBox: {
    flexDirection: 'row',
    marginBottom: 10
  },

  iconBox: {
    backgroundColor: '#000',
    marginRight: 'auto',
    height: 28,
    width: 28,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
    overflow: 'hidden'
  },

  icon: {
    width: 15,
    height: 15
  },

  btn: {
    backgroundColor: BRAND_LIGHT,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 7,
    paddingHorizontal: 15,
    height: 28
  },

  btnText: {
    color: '#fff'
  },

  newsTitle: {
    fontSize: 26,
    color: '#fff',
    lineHeight: 23,
    paddingTop: 5
  },

  sourceContainer: {
    height: 45,
    backgroundColor: '#400846',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 'auto',
    paddingHorizontal: 15,
    paddingTop: 5,
    marginBottom: 25,
    marginTop: 12
  },

  sourceText: {
    color: '#fff',
    fontSize: 16
  },

  newsText: {
    color: '#fff',
    lineHeight: 13,
    paddingBottom: 3
  }
})

export default Featured
