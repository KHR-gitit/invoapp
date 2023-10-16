import React, { Fragment } from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    invoiceNoContainer: {
        flexDirection: 'row',
        marginTop: 36,
        justifyContent: 'flex-end'
    },
    invoiceDateContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    invoiceDate: {
            fontSize: 12,
            fontStyle: 'bold',
    },
    label: {
        width: 60
    }
    
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
  const PdfNum = ({invoice}:Props) => (
        <Fragment>
            <View style={styles.invoiceNoContainer}>
                <Text style={styles.label}>Invoice No:</Text>
                <Text style={styles.invoiceDate}>{invoice.invoice_no}</Text>
            </View >
            <View style={styles.invoiceDateContainer}>
                <Text style={styles.label}>Date: </Text>
                <Text >{invoice.trans_date}</Text>
            </View >
        </Fragment>
  );
  
  export default PdfNum