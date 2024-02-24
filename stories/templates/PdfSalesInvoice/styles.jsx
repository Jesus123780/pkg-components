import { StyleSheet } from '@react-pdf/renderer'
import { BColor, PColor, PLColor, SFColor } from '../../../assets'

export const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexGrow: 1
  },
  header: {
    borderWidth: 0.5,
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
    padding: 5,
    paddingTop: 10,
    marginBottom: 5,
    borderRadius: 2,
    alignContent: 'center',
    alignItems: 'center'
  },
  centeredText: {
    textAlign: 'center'
  },
  bordered: {
    borderWidth: 0.5,
    borderColor: SFColor,
    borderStyle: 'solid',
    marginBottom: 5
  },
  column: {
    flexBasis: '25%',
    padding: 0,
    borderRightWidth: 0.1,
    borderColor: BColor,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center'
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
  },
  card_sub_items: {
    lineHeight: '.5',
    margin: '0',
    textAlign: 'left',
    flexWrap: 'wrap'
  },
  name: {
    fontSize: 10,
    fontWeight: 'bold'
  },
  section: {
    padding: 10,
    flexGrow: 1
  },
  qrImage: {
    width: 150,
    height: 150,
    maxHeight: 150,
    maxWidth: 150
  },
  item: {
    borderTopWidth: 0.1,
    borderTopColor: SFColor,
    borderBottomWidth: 0.1,
    borderBottomColor: SFColor
  }
})
