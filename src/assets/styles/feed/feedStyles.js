import { StyleSheet } from 'react-native'

export const feedStyles = StyleSheet.create({
  linkContainer: {
    borderColor: '#ddd',
    borderRadius: 10,
    borderWidth: 1,
    overflow: 'hidden',
    marginVertical: 7
  },

  linkCaption: {
    fontSize: 18
  },

  linkText: {
    fontSize: 16,
    letterSpacing: 0.3,
    lineHeight: 15,
    margin: 10
  },

  linkSource: {
    fontSize: 14,
    marginTop: -7,
    marginLeft: 10,
    marginBottom: 5
  }
})