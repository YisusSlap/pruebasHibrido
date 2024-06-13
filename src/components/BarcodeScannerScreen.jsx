import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { ref, get } from 'firebase/database';
import { database } from './FirebaseConfigBarcode';
import { useNavigation } from '@react-navigation/native'; // Asegúrate de importar useNavigation

const BarcodeScannerScreen = () => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const navigation = useNavigation(); // Inicializa la navegación

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = async ({ type, data }) => {
        setScanned(true);
        try {
            const snapshot = await get(ref(database, 'alimento'));
            if (snapshot.exists()) {
                const alimentos = snapshot.val();
                let foundProduct = null;

                Object.keys(alimentos).forEach(key => {
                    if (alimentos[key].CodigoBarras === data) {
                        foundProduct = alimentos[key];
                    }
                });

                navigation.navigate('ScannedScreen', { product: foundProduct || {} });
            } else {
                navigation.navigate('ScannedScreen', { product: {} });
            }
        } catch (error) {
            console.error("Error obteniendo el producto:", error);
            navigation.navigate('ScannedScreen', { product: {} });
        }
    };

    if (hasPermission === null) {
        return <Text>Solicitando permiso para acceder a la cámara...</Text>;
    }
    if (hasPermission === false) {
        return <Text>No se ha concedido permiso para acceder a la cámara</Text>;
    }

    return (
        <View style={styles.container}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />
            {scanned && (
                <TouchableOpacity
                    onPress={() => setScanned(false)}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Escanear nuevamente</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#800000',
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default BarcodeScannerScreen;
