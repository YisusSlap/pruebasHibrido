import React from "react";
import { StyleSheet, Alert, View, TextInput, TouchableOpacity, Image } from 'react-native';
import StyleText from "./StyleText.jsx";
import Constants from 'expo-constants'
import { useState } from "react";
import { useNavigation } from '@react-navigation/native';

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./Firebase-config.jsx";

const Signin2 = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    const handleSignin = () =>{
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            navigation.navigate('MainStack');
        })
        .catch(error => {
            console.log(error)
            Alert.alert(error.massage)
        })
    }


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
                onChangeText={(text) => setEmail(text)}
            />
            <TextInput
                placeholder='Contraseña'
                style={styles.textInputs}
                secureTextEntry={true}
                value={password}
                onChangeText={(text)=> setPassword(text)}
            />

            <TouchableOpacity style={styles.boton} onPress={handleSignin}>
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
