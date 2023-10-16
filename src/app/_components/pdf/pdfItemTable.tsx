import React from 'react';
import {View, StyleSheet } from '@react-pdf/renderer';
import PdfTableHeader from './pdfTableHeader'
import PdfTableRow from './pdfTableRow'
import PdfTableEmptyRow from './pdfTableEmptyRow'
import PdfTableFooter from './pdfTableFooter'

const tableRowsCount = 11;

const styles = StyleSheet.create({
    tableContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 24,
        borderWidth: 1,
        borderColor: '#bff0fd',
    },
});
interface Props {
  invoice: {
      id: string;
      invoice_no: number | undefined;
      businessData: {
        company: string | undefined;
        email: string | undefined;
        phone: string | undefined;
        address: string | undefined;
      }
      clientData: {
        fullName: string;
        email: string | undefined;
        phone: string | undefined;
        address: string | undefined;
      }

      trans_date: string;
      due_date: string;
      items: {
          sno: number;
          desc: string;
          qty: number;
          rate: number;
      }[]

  };

  
}
  const PdfItemsTable = ({invoice}:Props) => (
    <View style={styles.tableContainer}>
        <PdfTableHeader />
        <PdfTableRow items={invoice.items} />
        <PdfTableEmptyRow rowsCount={ tableRowsCount - invoice.items.length} />
        <PdfTableFooter items={invoice.items} />
    </View>
  );
  
  export default PdfItemsTable