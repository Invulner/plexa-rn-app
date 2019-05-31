import React from 'react'
import { StyleSheet, View } from 'react-native'
import { RED } from '../../assets/styles/colors'
import { BoldText } from '../common/fonts'

function Badge (props) {
  return (
    <View style={[styles.badge, props.boxStyle]}>
      <BoldText style={styles.badgeText}>
        {props.value.toString()}
      </BoldText>
    </View>
  )
}

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    bottom: 3,
    left: 55,
    paddingLeft: 7,
    paddingRight: 7,
    height: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: RED,
    borderRadius: 40
  },

  badgeText: {
    marginTop: 4,
    color: '#fff',
  },

})

export default Badge
