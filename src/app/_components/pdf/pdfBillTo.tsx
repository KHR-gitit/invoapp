import React from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    headerContainer: {
        marginTop: 36
    },
    billTo: {
        marginTop: 20,
        paddingBottom: 3,
        fontFamily: 'Helvetica-Oblique'
    },
  });

  interface Props {
    invoice: {
        id: string;
        invoice_no: number;
        businessData: {
          company: string;
          email: string;
          phone: string;
          address: string;
        }
        clientData: {
          fullName: string;
          email: string;
          phone: string;
          address: string;
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
  const PdfBillTo = ({invoice}:Props) => (
    <View style={styles.headerContainer}>
        <Text style={styles.billTo}>Bill To:</Text>
        <Text>{invoice.clientData.fullName}</Text>
        <Text>{invoice.clientData.address}</Text>
        <Text>{invoice.clientData.phone}</Text>
        <Text>{invoice.clientData.email}</Text>
    </View>
  );
  
  export default PdfBillTo