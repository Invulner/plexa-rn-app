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
    marginHorizontal: 10,
    marginTop: 10
  },

  linkSource: {
    fontSize: 14,
    marginVertical: 5,
    marginLeft: 10
  },

  linkImage: {
    width: '100%',
    resizeMode: 'cover',
    height: 126
  }
})
