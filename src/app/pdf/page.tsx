"use client";
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';


import PdfTitle from '../_components/pdf/pdfTitle'
import PdfBillTo from '../_components/pdf/pdfBillTo'
import PdfNum from '../_components/pdf/pdfNum'
import PdfItemTable from '../_components/pdf/pdfItemTable'
import PdfTYMessage from '../_components/pdf/pdfTYMessage'


const PDFDownloadLink = dynamic(() => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});
const invoiceData = {
    id: "5df3180a09ea16dc4b95f910",
    invoice_no: "201906-28",
    balance: "$2,283.74",
    company: "MANTRIX",
    email: "susanafuentes@mantrix.com",
    phone: "+1 (872) 588-3809",
    address: "922 Campus Road, Drytown, Wisconsin, 1986",
    trans_date: "2019-09-12",
    due_date: "2019-10-12",
    items: [
      {
        sno: 1,
        desc: "ad sunt culpa occaecat qui",
        qty: 5,
        rate: 405.89,
      },
      {
        sno: 2,
        desc: "cillum quis sunt qui aute",
        qty: 5,
        rate: 373.11,
      },
      {
        sno: 3,
        desc: "ea commodo labore culpa irure",
        qty: 5,
        rate: 458.61,
      },
      {
        sno: 4,
        desc: "nisi consequat et adipisicing dolor",
        qty: 10,
        rate: 725.24,
      },
      {
        sno: 5,
        desc: "proident cillum anim elit esse",
        qty: 4,
        rate: 141.02,
      },
    ],
  };

// Create styles

const styles = StyleSheet.create({
    page: {
        fontFamily: 'Helvetica',
        fontSize: 11,
        paddingTop: 30,
        paddingLeft:60,
        paddingRight:60,
        lineHeight: 1.5,
        flexDirection: 'column',
    }, 
    logo: {
        width: 74,
        height: 66,
        marginLeft: 'auto',
        marginRight: 'auto'
    }
  });

  interface Props {
    invoice: {
        id: string;
        invoice_no: string;
        balance: string;
        company: string;
        email: string;
        phone: string;
        address: string;
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

// Create Document Component
const MyDocument = ({invoice}:Props) => (
    <Document>
    <Page size="A4" style={styles.page}>
        <PdfTitle title='Invoice'/>
        <PdfNum invoice={invoice}/>
        <PdfBillTo invoice={invoice} />
        <PdfItemTable invoice={invoice} />
        <PdfTYMessage />
    </Page>
</Document>
);



  export default function Pdf () {
    const [isClient, setIsClient] = useState(false)
  
    useEffect(() => {
      setIsClient(true)
    }, [])
  
    return (
      <>
        {isClient && (<>
            <PDFDownloadLink document={<MyDocument invoice={invoiceData}/>} fileName="invoice.pdf">
          {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}</PDFDownloadLink>

        </>
        )}
      </>
    );
  }
  


