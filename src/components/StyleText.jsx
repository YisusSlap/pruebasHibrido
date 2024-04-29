import React from "react";
import { Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    text:{
        fontSize: 12,
        color: 'grey'
    },
    bold: {
        fontWeight: 'bold'
    },
    rojo: {
        color: '#800000'
    },
    big: {
        fontSize: 20
    },
    small: {
        fontSize: 10
    },
    negro: {
        color: 'black'
    },
    blanco: {
        color: 'white'
    }
})

export default function StyleText ({ bold, rojo, big, small, children, negro}){
    const textStyles = [
        styles.text,
        rojo && styles.rojo,
        bold && styles.bold,
        big && styles.big,
        small &&  styles.small,
        negro && styles.black
    ]
    return (
        <Text style={textStyles}>
            {children}
        </Text>
    )
}