import React from 'react'
import { ActivityIndicator, View, StyleSheet} from 'react-native'

function Loader(props) {
  const { style } = props
  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size='large' />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default Loader
