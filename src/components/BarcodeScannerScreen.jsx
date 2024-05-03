import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { handleAddFood } from './FoodListScreen';

    //la biblioteca rnc es para acceder a la camara
    //pongan en consula npm install react-native camera

const BarcodeScannerScreen = () => {
    const [scanned, setScanned] = useState(false);
    const [barcodeValue, setBarcodeValue] = useState('');

    const handleBarCodeScanned = ({ data }) => {
        setScanned(true);
        setBarcodeValue(data);
        //escaneo (poner lodica despues)
        console.log(`Código de barras escaneado: ${data}`);
    };

    const handleResetScanner = () => {
        setScanned(false);
        setBarcodeValue('');
    };

    return (
        <View style={styles.container}>
            <RNCamera
                style={styles.cameraView}
                onBarCodeRead={scanned ? undefined : handleBarCodeScanned}
            >
                {scanned && (
                    <View style={styles.scanResultContainer}>
                        <Text style={styles.scanResultText}>
                            Código de barras escaneado: {barcodeValue}
                        </Text>
                        <TouchableOpacity style={styles.resetButton} onPress={handleResetScanner}>
                            <Text style={styles.resetButtonText}>Escanear de nuevo</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </RNCamera>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    cameraView: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    scanResultContainer: {
        padding: 16,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    scanResultText: {
        color: '#fff',
        fontSize: 18,
        marginBottom: 8,
    },
    resetButton: {
        backgroundColor: '#007bff',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 4,
    },
    resetButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default BarcodeScannerScreen;