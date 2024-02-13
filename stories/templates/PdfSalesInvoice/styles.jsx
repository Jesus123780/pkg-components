import { StyleSheet } from '@react-pdf/renderer';

export const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 20,
  },
  section: {
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 50, // Ajusta el tamaño del logo según sea necesario
    height: 50, // Ajusta el tamaño del logo según sea necesario
    marginRight: 10,
  },
  storeName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  address: {
    marginBottom: 5,
  },
  storePhone: {
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    marginBottom: 5,
  },
  clientInfo: {
    marginBottom: 5,
  },
  tableHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  table: {
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000000',
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#000000',
  },
  tableCellHeader: {
    flex: 1,
    padding: 5,
    fontWeight: 'bold',
    borderRightWidth: 1,
    borderColor: '#000000',
  },
  tableCell: {
    flex: 1,
    padding: 5,
    borderRightWidth: 1,
    borderColor: '#000000',
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  change: {
    fontSize: 16,
  },
});
