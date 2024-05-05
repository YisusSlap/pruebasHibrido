import React from "react";
import { StyleSheet, StatusBar, View, TextInput, TouchableOpacity, Image } from 'react-native';
import StyleText from "./StyleText.jsx";
import Constants from 'expo-constants'
import { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { authenticate } from './AuthService';

const Signin2 = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const handleLogin = () => {
        const isAuthenticated =  authenticate(email, password);
        if (isAuthenticated) {
            // Navegar a la pantalla de bienvenida
            navigation.navigate('MainStack');
            {/*console.log('Autenticación exitosa');*/}
        } else {
            Alert.alert('Error', 'Credenciales inválidas');
        }
    };

    const goToSignup = () => {
        navigation.navigate('Signup');
    };

    return (
        <View style={styles.container}>
            <Image
                source={require('./logoAlma.png')}
                style={styles.logo}
            />

            <TextInput
                placeholder='Correo electrónico'
                style={styles.textInputs}
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                placeholder='Contraseña'
                style={styles.textInputs}
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
            />

            <TouchableOpacity style={styles.boton} onPress={handleLogin}>
                <StyleText fontWeight={'bold'} color={'primary'}>Iniciar Sesión</StyleText>
            </TouchableOpacity>

            <StyleText >¿No tienes una cuenta?</StyleText>

            <TouchableOpacity onPress={goToSignup}>
                <StyleText color={'secondary'}>Crea una nueva</StyleText>
            </TouchableOpacity>

            
            <StyleText>Atrakito</StyleText>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: Constants.statusBarHeight,
        flexGrow: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
  
    textInputs: {
        borderWidth: 1,
        borderColor: '#DCC566',
        padding: 10,
        paddingStart: 30,
        width: '80%',
        height: 50,
        marginBottom: 20,
        borderRadius: 10,
        backgroundColor: '#fff'
    },
  
    boton: {
        borderBottomEndRadius: 50,
        borderBottomStartRadius: 50,
        borderRadius: 50,
        backgroundColor: '#800000',
        width: '80%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 50,
        marginTop: 10,
        marginBottom: 50 
    },
  
    logo: {
        width: 200,
        height: 160,
        marginTop: 100,
        marginBottom: 50
    }
});

export default Signin2;
