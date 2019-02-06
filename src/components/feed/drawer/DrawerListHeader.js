import React, { Component } from 'react'
import { View, Image, StyleSheet } from 'react-native'
import { RegularText } from '../../common/fonts'
import { TEXT_COLOR, BRAND_DARK } from '../../../assets/styles/colors'

class DrawerListHeader extends Component {
  renderIcon = () => {
    const { title } = this.props
    
    switch(title) {
      case 'Plexa':
        return (
          <Image
            source={require('../../../assets/icons/logo-min-01.png')} 
            style={styles.icon} />
        )
      case 'Groups':
        return (
          <Image
            source={require('../../../assets/icons/user-groups-01.png')} 
            style={styles.icon} />
        )
      case 'Filter by Specialty':
        return (
          <Image
            source={require('../../../assets/icons/specialties.png')} 
            style={styles.icon} />
        )
      case 'Filter by Location':
        return (
          <Image
            source={require('../../../assets/icons/location-01.png')} 
            style={styles.icon} />
        )
    }
  }

  render() {
    const { title }  = this.props

    return (
      <View>
        <View style={styles.container}>
          <View style={styles.iconBox}>
            {this.renderIcon()}
          </View>
          <RegularText style={styles.text}>
            {title}
          </RegularText>
        </View>
        <View style={styles.bottomLine}/>
      </View>
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
    color: TEXT_COLOR,
    fontSize: 20,
    marginTop: 5
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
