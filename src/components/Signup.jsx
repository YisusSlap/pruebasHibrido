import React from "react";
import { StyleSheet, StatusBar, View, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import StyleText from "./StyleText.jsx";
import Constants from 'expo-constants';
import { useState } from "react";
import { useNavigation } from '@react-navigation/native';

import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./Firebase-config.jsx";

const Signup = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const navigation = useNavigation();

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    //Crear la cuenta
    const handleCreateAccount = () => {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            // Actualizar el perfil del usuario con el nombre
            updateProfile(user, {
                displayName: name,
            }).then(() => {
                //Si todo esta correcto ir a la app inicial
                navigation.navigate('MainStack');
            }).catch((error) => {
                //Si hubo error al actualizar nombre
                Alert.alert(error.message);
            });
        })
        .catch(error => {
            //Si hubo error al registrarse
            Alert.alert('Error during sign up', error.message);
        });
    }

    const goToSignin = () => {
        navigation.navigate('Signin');
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
                onChangeText={(text) => setEmail(text)}
            />
            <TextInput
                placeholder='Nombre'
                style={styles.textInputs}
                value={name}
                onChangeText={(text) => setName(text)}
            />
            <TextInput
                placeholder='Contraseña'
                style={styles.textInputs}
                secureTextEntry={true}
                value={password}
                onChangeText={(text) => setPassword(text)}
            />

            <TouchableOpacity style={styles.boton} onPress={handleCreateAccount}>
                <StyleText fontWeight={'bold'} color={'primary'}>Registrarte</StyleText>
            </TouchableOpacity>

            <StyleText >¿Tienes una cuenta?</StyleText>

            <TouchableOpacity onPress={goToSignin}>
                <StyleText color={'secondary'}>Inicia sesión</StyleText>
            </TouchableOpacity>

            <StyleText>Atrakito</StyleText>
        </View>
    );
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
        marginTop: 80,
        marginBottom: 50
    }
});

export default Signup;
