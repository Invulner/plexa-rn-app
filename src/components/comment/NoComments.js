import React from 'react'
import { StyleSheet, View } from 'react-native'
import TopGreyLine from './TopGreyLine';
import { RegularText } from '../common/fonts';

function NoComments() {
  return (
    <React.Fragment>
      <TopGreyLine />
      <View style={styles.container}>
        <RegularText style={styles.text}>
          No comments
        </RegularText>
      </View>
    </React.Fragment>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    marginBottom: -5
  },

  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 50,
    width: '100%'
  }
})

export default NoComments
