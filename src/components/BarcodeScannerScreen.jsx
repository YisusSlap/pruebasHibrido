import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { ref, get, child } from "firebase/database"; //
import { database } from './FirebaseConfigBarcode';
const BarcodeScannerScreen = () => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = async ({ type, data }) => {
        setScanned(true);
        alert(`Código de barras escaneado: ${data}`);

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

                if (foundProduct) {
                    alert(`Nombre: ${foundProduct.nombre}`);
                    alert(`Marca: ${foundProduct.Marca}`);
                    alert(`Tamaño: ${foundProduct.Tamanio}`);
                    alert(`Descripción: ${foundProduct.Descripcion}`);
                    alert(`Información Nutricional: ${foundProduct.InfoNutrimental}`);
                    alert(`Ingredientes: ${foundProduct.ingredientes}`);
                } else {
                    alert('Producto no encontrado');
                }
            } else {
                alert('No se encontraron productos en la base de datos');
            }
        } catch (error) {
            console.error("Error obteniendo el producto:", error);
            alert('Error al obtener el producto');
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