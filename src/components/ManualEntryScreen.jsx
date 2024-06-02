import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text } from 'react-native';
import { MaterialCommunityIcons, FontAwesome, SimpleLineIcons, Ionicons } from '@expo/vector-icons';

const ManualEntryScreen = () => {
    const [foodName, setFoodName] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [size, setSize] = useState('');
    const [description, setDescription] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [information, setInformation] = useState('');
    const [nutritionInformation, setNutritionInformation] = useState('');

    return (
        <View style={styles.container}>
            {/* Contenedor para el ícono */}
            <View style={styles.iconContainer}>
                <Ionicons name="image-outline" size={100} color="black" />
            </View>
            {/* Espacio vertical */}
            <View style={styles.separator}></View>
            {/* Contenedor para los text inputs */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Nombre del alimento"
                    value={foodName}
                    onChangeText={setFoodName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Marca"
                    value={brand}
                    onChangeText={setBrand}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Categoría"
                    value={category}
                    onChangeText={setCategory}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Tamaño"
                    value={size}
                    onChangeText={setSize}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Descripción"
                    value={description}
                    onChangeText={setDescription}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Ingredientes"
                    value={ingredients}
                    onChangeText={setIngredients}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Información"
                    value={information}
                    onChangeText={setInformation}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Información nutrimental"
                    value={nutritionInformation}
                    onChangeText={setNutritionInformation}
                />
            </View>
            {/* Iconos */}
            <View style={styles.bottomIconContainer}>
                <MaterialCommunityIcons name="fridge-outline" size={50} color="black" />
                <FontAwesome name="snowflake-o" size={50} color="black" />
                <SimpleLineIcons name="drawer" size={50} color="black" />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff', // Fondo blanco
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    iconContainer: {
        width: '100%',
        alignItems: 'center',
    },
    separator: {
        height: 20, // Espacio vertical
    },
    inputContainer: {
        width: '80%', // Ancho del inputContainer
        paddingHorizontal: 20,
        paddingVertical: 10, // Espaciado vertical
        backgroundColor: '#f2f2f2',
        borderRadius: 10,
    },
    input: {
        height: 30,
        width: '100%',
        paddingHorizontal: 8,
        marginBottom: 8,
        backgroundColor: 'transparent',
    },
    bottomIconContainer: {
        flexDirection: 'row', // Muestra los íconos en una fila horizontal
        justifyContent: 'space-between', // Espacio entre los íconos
        width: '70%', // Ancho del contenedor de íconos
        marginVertical: 10, // Espacio vertical
    },
});

export default ManualEntryScreen;
