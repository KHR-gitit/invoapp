import React from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = '#90e5fc'
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderBottomColor: '#bff0fd',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        fontSize: 12,
        fontStyle: 'bold',
    },
    description: {
        width: '85%',
        textAlign: 'right',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        paddingRight: 8,
    },
    total: {
        width: '15%',
        textAlign: 'right',
        paddingRight: 8,
    },
  });

  interface Props {

        items: {
            sno: number;
            desc: string;
            qty: number;
            rate: number;
        }[]

    
  }
const PdfTableFooter = ({items}:Props) => {
    const total:number = items.map(item => item.qty * item.rate)
        .reduce((accumulator:number, currentValue:number) => accumulator + currentValue , 0)
    return(  
        <>
        <View style={styles.row}>
            <Text style={styles.description}>Sub Total</Text>
            <Text style={styles.total}>{total.toFixed(2)}</Text>
        </View>
        <View style={styles.row}>
            <Text style={styles.description}>GST 10%</Text>
            <Text style={styles.total}>{((10 / 100) * total).toFixed(2)}</Text>
        </View>
        <View style={styles.row}>
            <Text style={styles.description}>TOTAL Amount</Text>
            <Text style={styles.total}>{(total + ((10 / 100) * total)).toFixed(2)}</Text>
        </View>
        </>  
    )
};
  
  export default PdfTableFooter