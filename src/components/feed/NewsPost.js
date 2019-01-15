import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { BTN_COLOR } from '../../assets/styles/colors'
import NewsIcon from './NewsIcon'
import RegularText from '../common/fonts/RegularText'

class NewsPost extends Component {
  render() {
    return (
      <View style={styles.newsContainer}>
        <View style={styles.topBox}> 
          <View style={styles.iconBox}>
            <NewsIcon style={styles.icon}/>
          </View>
          <TouchableOpacity style={styles.btn}>
            <RegularText style={styles.btnText}>
              Post this
            </RegularText>
          </TouchableOpacity>
        </View>
        <RegularText style={styles.newsTitle}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed suscipit voluptatibus earum sit omnis rerum libero.
        </RegularText>
        <View style={styles.sourceContainer}>
          <RegularText style={styles.sourceText}>
            news's source
          </RegularText>
        </View>
        <RegularText style={styles.newsText}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos atque, dolor nulla non neque inventore quis earum magni iusto repellat! Nam officiis ullam odio deserunt repudiandae nihil, nemo unde numquam, repellendus eius officia perferendis modi ipsum accusantium consequatur dolorem atque...
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
    backgroundColor: BTN_COLOR,
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
    color: '#fff'
  },

  sourceContainer: {
    height: 40,
    backgroundColor: '#400846',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 'auto',
    paddingHorizontal: 15,
    paddingTop: 5,
    marginBottom: 25,
    marginTop: 15
  },

  sourceText: {
    color: '#fff',
    fontSize: 16
  },

  newsText: {
    color: '#fff'
  }
})

export default NewsPost
