import React from "react";
import { Text, StyleSheet } from "react-native";
import theme from '../components/theme.js'

const styles = StyleSheet.create({
    text:{
        fontSize: theme.fontSizes.body,
        color: theme.colors.textPrimary,
        fontFamily: theme.fonts.main,
        fontWeight: theme.fontWeights.normal
    },
    bold: {
        fontWeight: theme.fontWeights.bold
    },
    colorPrimary: {
        color: theme.colors.primary
    },
    colorSecondary: {
        color: theme.colors.textSecondary
    },
    subHeading: {
        fontSize: theme.fontSizes.subheading
    }
})

export default function StyleText ({ children, color, fontSize, fontWeight, style, ... restOfProps}){
    const textStyles = [
        styles.text,
        color == 'primary' && styles.colorPrimary,
        color == 'secondary' && styles.colorSecondary,
        fontSize == 'subheading' && styles.subHeading,
        fontWeight == 'bold' && styles.bold
    ]
    return (
        <Text style={textStyles} {... restOfProps}>
            {children}
        </Text>
    )
}