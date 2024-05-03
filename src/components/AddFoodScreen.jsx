import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import ManualEntryScreen from './ManualEntryScreen';
import BarcodeScannerScreen from './BarcodeScannerScreen';

const AddFoodScreen = () => {
    const [showManualEntry, setShowManualEntry] = useState(false);
    const [showBarcodeScanner, setShowBarcodeScanner] = useState(false);

    const handleManualEntryPress = () => {
        setShowManualEntry(true);
    };

    const handleBarcodeScannerPress = () => {
        setShowBarcodeScanner(true);
    };

    return (
        <View style={styles.container}>
            {!showManualEntry && !showBarcodeScanner && (
                <>
                    <TouchableOpacity style={styles.option} onPress={handleManualEntryPress}>
                        <Text style={styles.optionText}>Manualmente</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.option} onPress={handleBarcodeScannerPress}>
                        <Text style={styles.optionText}>Vía código de barras</Text>
                    </TouchableOpacity>
                </>
            )}
            {showManualEntry && <ManualEntryScreen />}
            {showBarcodeScanner && <BarcodeScannerScreen />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    option: {
        marginVertical: 16,
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 8,
    },
    optionText: {
        fontSize: 18,
    },
});

export default AddFoodScreen;