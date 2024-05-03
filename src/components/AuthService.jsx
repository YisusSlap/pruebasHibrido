// AuthService.js
import { AsyncStorage } from 'react-native';

// Reemplaza estas credenciales con las tuyas
const validEmail = 'prueba@example.com';
const validPassword = '123';

export const authenticate = async (email, password) => {
    if (email === validEmail && password === validPassword) {
        await AsyncStorage.setItem('isAuthenticated', 'true');
        return true;
    } else {
        return false;
    }
};

export const isAuthenticated = async () => {
    const isAuthenticated = await AsyncStorage.getItem('isAuthenticated');
    return isAuthenticated === 'true';
};