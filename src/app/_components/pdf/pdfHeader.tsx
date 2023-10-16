import React from 'react';
import {Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import logo from "./../../saiid-bel-hDq8jlhE0co-unsplash.jpg"
const styles = StyleSheet.create({
    headerContainer: {

    },
    billTo: {
        marginTop: 20,
        paddingBottom: 3,
        fontFamily: 'Helvetica-Oblique'
    },
    viewContainer: {
        position:"relative",
        top:0,
        display:"flex",
        flexDirection:"row",
        justifyContent:"flex-end",
        lineHeight: 1.5,
    },
    logo: {
        width: 74,
        height: 66,
        position:"absolute",
        left:0,
        top:0,
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

    
  const PdfHeader = ({invoice}:Props) => (
    <View style={styles.viewContainer}>

    
<Image src={logo.src} style={styles.logo}/>
    <View style={styles.headerContainer}>
        <Text style={styles.billTo}>Bill From:</Text>
        <Text>{invoice.businessData.company}</Text>
        <Text>{invoice.businessData.address}</Text>
        <Text>{invoice.businessData.phone}</Text>
        <Text>{invoice.businessData.email}</Text>
    </View>
    </View>
  );
  
  export default PdfHeader