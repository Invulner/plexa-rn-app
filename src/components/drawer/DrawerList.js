import React, { Component } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import DrawerListHeader from './DrawerListHeader'
import { RegularText } from '../common/fonts'
import { BG_COLOR, BRAND_DARK } from '../../assets/styles/colors'
import { withNavigation } from 'react-navigation'

class DrawerList extends Component {
  navigateTo = (route) => {
    const { navigate, closeDrawer } = this.props.navigation

    navigate(route)
    closeDrawer()
  }

  render() {
    const { data, headerTitle, index } = this.props

    return (
      <FlatList 
        style={styles.flatList}
        data={data}
        renderItem={({item}) => (

          <View style={styles.itemBox}>
            <RegularText 
              onPress={() => this.navigateTo(item.path)}
              style={styles.item}>
              {item.option}
            </RegularText>
            {item.messages && 
              <View style={styles.messagesBox}>
                <RegularText style={styles.messages}>{item.messages}</RegularText>
              </View>
            }
          </View>

        )}
        keyExtractor={item => item.option}
        ListHeaderComponent={<DrawerListHeader title={headerTitle} index={index}/>} />
    )
  }
}

const styles = StyleSheet.create({
  item: {
    fontSize: 20,
  },

  messagesBox: {
    width: 20,
    height: 20,
    borderRadius: 15,
    overflow: 'hidden',
    marginLeft: 10,
    backgroundColor: BRAND_DARK,
    justifyContent: 'center',
    alignItems: 'center'
  },

  messages: {
    fontSize: 17,
    color: BG_COLOR,
    marginTop: 3
  },
  
  itemBox: {
    marginVertical: 5,
    marginLeft: 5,
    flexDirection: 'row'
  },

  flatList: {
    marginBottom: 35
  }
})

export default withNavigation(DrawerList)
