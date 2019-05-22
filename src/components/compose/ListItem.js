import React from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import GrayLine from '../common/GrayLine'
import { RegularText } from '../common/fonts'
import IconChecked from '../common/IconChecked'
import { DARK_GRAY } from '../../assets/styles/colors'

function UserListItem(props) {
  const { name, isChosen, onItemPress } = props

  return (
    <React.Fragment>
      <View style={styles.groupBox}>
        <TouchableOpacity
          style={styles.btn}
          onPress={onItemPress}>
          <RegularText style={styles.groupText}>
            {name}
          </RegularText>
        </TouchableOpacity>
        {isChosen && <IconChecked />}
      </View>
      <GrayLine boxStyle={styles.lineSolid}/>
    </React.Fragment>
  )
}

const styles = StyleSheet.create({
  lineSolid: {
    paddingHorizontal: 0
  },

  btn: {
    flex: 1
  },

  groupBox: {
    height: 50,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },

  groupText: {
    fontSize: 18,
    marginTop: 10,
    color: DARK_GRAY
  }
})

export default UserListItem
