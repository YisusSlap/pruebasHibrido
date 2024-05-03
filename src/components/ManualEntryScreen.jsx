import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native';
import { handleAddFood } from './FoodListScreen';

const ManualEntryScreen = () => {
    const [foodName, setFoodName] = useState('');

    const handleSubmit = () => {
        // agregar la lógica despues
        console.log(`Alimento ingresado: ${foodName}`);
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Ingresa el nombre del alimento"
                value={foodName}
                onChangeText={setFoodName}
            />
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Agregar</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: '80%',
        height: 40,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        paddingHorizontal: 8,
        marginBottom: 16,
    },
    button: {
        backgroundColor: '#007bff',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 4,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
});

export default ManualEntryScreen;