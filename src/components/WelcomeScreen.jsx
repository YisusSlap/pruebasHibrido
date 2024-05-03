import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import StyleText from './StyleText.jsx';

const WelcomeScreen = () => {
    return (
        <View style={styles.container}>
            <Image source={require('./logoAlma.png')} style={styles.logo} />
            <StyleText style={styles.title}>Bienvenido</StyleText>
            <View style={styles.descriptionContainer}>
                <StyleText>AlmaZen es una aplicación diseñada para ayudarte a diseñar un menú adaptado a tu alacena</StyleText>
            </View>
            <View style={styles.imageContainer}>
                <Image source={require('./chef.png')} style={styles.welcomeImage} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    logo: {
        width: 200,
        height: 160,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    descriptionContainer: {
        marginBottom: 20,
        paddingHorizontal: 20,
        textAlign: 'center',
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 20,
    },
    welcomeImage: {
        width: '100%',
        height: 200,
        resizeMode: 'contain',
    },
});

export default WelcomeScreen;