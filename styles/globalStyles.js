import { StyleSheet } from 'react-native'

export const globalStyles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8
  },
  smallImage: {
    width: 150,
    height: 150
  },
  textBold: {
    fontWeight: 'bold'
  },
  mh5: {
    marginHorizontal: 10
  },
  mv10: {
    marginVertical: 10
  },
  textRed: {
    color: '#F24C4C'
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    marginHorizontal: 15
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  }
});