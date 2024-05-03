import React from "react";
import { StyleSheet, StatusBar, View, TextInput, Alert, TouchableOpacity, TouchableWithoutFeedback, Image } from 'react-native';
import StyleText from "./StyleText.jsx";
import Constants from 'expo-constants'
import { authenticate } from './AuthService';

const Signin = () =>{

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        const isAuthenticated = await authenticate(email, password);
        if (isAuthenticated) {
            // Navegar a la pantalla de bienvenida
            console.log('Autenticación exitosa');
        } else {
            Alert.alert('Error', 'Credenciales inválidas');
        }
    };
    

    return (
        <View style={styles.container}>
      
            <Image
                source={require('./logoAlma.png')}
                style={styles.logo}
            />
      
            <TextInput placeholder='atoleytacos@email.com' style={styles.textInputs}/>
            <TextInput placeholder='contraseña' style={styles.textInputs}/>

            <View >
      
                <TouchableOpacity style={styles.boton} onPress={() => Alert.alert('Holiwis')} >
                    <StyleText blanco big>Iniciar Sesion</StyleText>
                </TouchableOpacity>
      
            </View>

            <StyleText >¿No tienes una cuenta?</StyleText>
            <TouchableWithoutFeedback>
                <StyleText rojo>Registrate</StyleText>
            </TouchableWithoutFeedback>
            <StyleText>from</StyleText>
            <StyleText negro={true} >Atrakito</StyleText>
            <StatusBar style="auto"/>
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
  boton:{
    borderBottomEndRadius: 50,
    borderBottomStartRadius: 50,
    borderRadius: 50,
    backgroundColor: '#800000',
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 50,
    marginTop: 10,
    marginBottom: 50 
  },
  logo:{
    width: 200,
    height: 160,
    marginTop: 100,
    marginBottom: 50
  }
});


export default Signin