import React from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
   
    titleContainer:{

    },
    reportTitle:{
        color: '#61dafb',
        letterSpacing: 4,
        fontSize: 25,

        textTransform: 'uppercase',
    }
  });
  interface Props {
    title: string;
    
  }

  const PdfTitle = ({title}:Props) => (
    <View style={styles.titleContainer}>
        <Text style={styles.reportTitle}>{title}</Text>
    </View>
  );
  
  export default PdfTitle