"use client";
import React, { useEffect, useState } from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';

import PdfTitle from '../../_components/pdf/pdfTitle'
import PdfBillTo from '../../_components/pdf/pdfBillTo'
import PdfNum from '../../_components/pdf/pdfNum'
import PdfItemTable from '../../_components/pdf/pdfItemTable'
import PdfTYMessage from '../../_components/pdf/pdfTYMessage'
import { api } from '~/trpc/client';
import PdfHeader from '~/app/_components/pdf/pdfHeader';




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
    invoiceHeader:{
      display:"flex",
      flexDirection:"row",
      justifyContent:"space-between"
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

// Create Document Component
const MyDocument = ({invoice}:Props) => (
    <Document>
    <Page size="A4" style={styles.page}>
        <PdfHeader invoice={invoice}/>
        <View style={styles.invoiceHeader}>
          <PdfTitle title='invoice'/>
          <PdfNum invoice={invoice}/>
        </View>
        <PdfBillTo invoice={invoice} />
        <PdfItemTable invoice={invoice} />
        <PdfTYMessage />
    </Page>
</Document>
);



  export default function Pdf ({ params }: { params: { slug: string } }) {

const [invoiceData, setInvoiceData] = useState({
  id: "",
  invoice_no: 0,
  businessData: {
    company: "",
    email: "",
    phone: "",
    address: "",
  },
  clientData: {
    fullName: "",
    email: "",
    phone: "",
    address: "",
  },

  trans_date: "",
  due_date: "",
  items: [{
      sno: 0,
      desc: "",
      qty: 0,
      rate: 0,
  }]
})
const [isClient, setIsClient] = useState(false)
useEffect(() => {
  const fetchInvoice = async () => {
    try {
      const invoice = await api.invoice.getInvoice.query({id: params.slug})
      setInvoiceData(invoice.data)
      console.log(invoice.data)
      setIsClient(true)
    } catch (error) {
      console.error(error)
    }
  }
  void fetchInvoice()
  
}, [params.slug])


  
    return (
      <>
        {isClient && (<>
            <PDFDownloadLink document={<MyDocument invoice={invoiceData}/>} fileName="invoice.pdf">
          {({ blob, url, loading, error }) => (loading ? 'Loading document...' : `${params.slug}`)}</PDFDownloadLink>
          <PDFViewer className='w-full h-screen'>
                <MyDocument invoice={invoiceData}/>
          </PDFViewer> 
        </>
        )}
      </>
    );
  }
  






  export const dynamic = "force-dynamic";


