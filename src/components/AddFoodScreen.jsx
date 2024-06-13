import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Importa el icono

const AddFoodScreen = () => {
    const navigation = useNavigation();

    const handleManualEntryPress = () => {
        navigation.navigate('ManualEntryScreen');
    };

    const handleBarcodeScannerPress = () => {
        navigation.navigate('BarcodeScannerScreen');
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.option} onPress={handleManualEntryPress}>
                <Text style={styles.optionText}>Manualmente</Text>
                <View style={styles.iconContainer}>
                    <MaterialCommunityIcons name="file-document-edit-outline" size={100} color="black" />
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option} onPress={handleBarcodeScannerPress}>
                <Text style={styles.optionText}>Vía código de barras</Text>
                <View style={styles.iconContainer}>
                    <MaterialCommunityIcons name="barcode-scan" size={100} color="black" />
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: Constants.statusBarHeight,
    },
    option: {
        marginVertical: 16,
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 8,
        width: '80%',
        height: '40%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column', // Cambiado a 'column' para alinear verticalmente
    },
    optionText: {
        fontSize: 18,
        marginBottom: 8, // Espacio entre el texto y el ícono
    },
    iconContainer: {
        marginTop: 8, // Espacio sobre el ícono
    },
});

export default AddFoodScreen;
