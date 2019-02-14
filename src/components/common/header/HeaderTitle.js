import React from 'react'
import { RegularText } from '../fonts'
import { View, StyleSheet } from 'react-native'
import { BRAND_DARK } from '../../../assets/styles/colors'

function HeaderTitle(props) {
  return (
    <View>
      <RegularText style={styles.text}>
        {props.title}
      </RegularText>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: BRAND_DARK,
    marginTop: 10
  }
})

export default HeaderTitle
