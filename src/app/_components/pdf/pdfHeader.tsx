import React from 'react';
import {Text, View, StyleSheet, Image } from '@react-pdf/renderer';
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
        invoice_no: string;
        balance: string;
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

    
  const PdfHeader = ({invoice}:Props) => (
    <View style={styles.viewContainer}>

    
<Image src={"https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2938&q=80"} style={styles.logo} alt="the logo"/>
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