import React, { Component } from 'react'
import { View, Image, StyleSheet } from 'react-native'
import { RegularText } from '../common/fonts'
import { BRAND_DARK } from '../../assets/styles/colors'
import { menuIcons } from '../../constants'

class DrawerListHeader extends Component {
  render() {
    const { title }  = this.props

    return (
      <React.Fragment>
        <View style={styles.container}>
          <View style={styles.iconBox}>
            <Image
              source={menuIcons[title]} 
              style={styles.icon} />
          </View>
          <RegularText style={styles.text}>
            {title}
          </RegularText>
        </View>
        <View style={styles.bottomLine}/>
      </React.Fragment>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  icon: {
    width: 17,
    height: 17,
    resizeMode: 'contain'
  },

  text: {
    color: BRAND_DARK,
    fontSize: 20,
    marginTop: 7
  },

  bottomLine: {
    width: '100%',
    height: 1,
    backgroundColor: BRAND_DARK,
    marginVertical: 5
  },

  iconBox: {
    width: 25,
    height: 25,
    backgroundColor: BRAND_DARK,
    borderRadius: 5,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15
  }
})

export default DrawerListHeader
