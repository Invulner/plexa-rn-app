import React from 'react'
import { StyleSheet, View } from 'react-native'
import { RegularText } from './fonts'

function SearchPlaceholder(props) {
  return (
    <View style={styles.container}>
      <RegularText style={styles.text}>
        {props.message}
      </RegularText>
    </View>
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

export default SearchPlaceholder
