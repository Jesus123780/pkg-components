import { StyleSheet } from '@react-pdf/renderer'
import { PColor, PLColor, SFColor } from '../../../assets'

export const styles = StyleSheet.create({
  container: {
    height: '95%'
  },
  header: {
    borderWidth: 1,
    borderColor: SFColor,
    borderStyle: 'solid',
    borderRadius: 5,
    marginBottom: 5
  },
  header_col: {
    flexBasis: '30%',
    borderRadius: 5,
    padding: 5,
    margin: 5
  },
  info: {
    backgroundColor: PColor,
    padding: 3,
    borderRadius: 2,
    alignContent: 'center',
    alignItems: 'center'
  },
  centeredText: {
    textAlign: 'center'
  },
  bordered: {
    borderWidth: 1,
    borderColor: SFColor,
    borderStyle: 'solid'
  },
  column: {
    flexBasis: '25%',
    padding: 4,
    borderRightWidth: 0.1,
    borderColor: '#000',
    alignItems: 'center'
  },
  firstColumn: {
    padding: 4,
    flexBasis: '10%',
    borderLeftWidth: 0.1
  },
  otherColumns: {

  },
  totalizer: {
    borderWidth: 1,
    borderColor: PLColor,
    borderStyle: 'solid',
    width: '40%',
    padding: 5,
    marginTop: 20,
    borderRadius: 5
  }
})
