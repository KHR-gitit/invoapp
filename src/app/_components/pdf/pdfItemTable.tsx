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

  const PdfItemsTable = ({invoice}) => (
    <View style={styles.tableContainer}>
        <PdfTableHeader />
        <PdfTableRow items={invoice.items} />
        <PdfTableEmptyRow rowsCount={ tableRowsCount - invoice.items.length} />
        <PdfTableFooter items={invoice.items} />
    </View>
  );
  
  export default PdfItemsTable