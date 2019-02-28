import React from 'react'
import { View, StyleSheet, SafeAreaView } from 'react-native'
import FeedHeaderLogo from '../../feed/feedHeader/FeedHeaderLogo'
import BackArrow from './BackArrow'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  const { isBackArrow } = state.header

  return { isBackArrow }
}

function CustomHeader(props) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.btnBox}>
        {props.isBackArrow &&
          <View style={styles.backBtn}>
            <BackArrow goToFeed />
          </View>
        }
        <View>
          <FeedHeaderLogo />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  btnBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 5,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#d8d8d8'
  },

  container: {
    backgroundColor: '#fff'
  },

  backBtn: {
    position: 'absolute',
    left: 10,
    bottom: 15
  }
})

export default connect(mapStateToProps, null)(CustomHeader)
