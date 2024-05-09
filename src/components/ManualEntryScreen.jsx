import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text } from 'react-native';


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
            {/* Texto "Imagen del producto" */}
            <Text style={styles.imageText}>Imagen del producto</Text>
            {/* Contenedor para la imagen */}
            <View style={styles.imageContainer}></View>
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
            {/* Recuadros negros */}
            <View style={styles.blackBoxContainer}>
                <View style={styles.blackBox}></View>
                <View style={styles.blackBox}></View>
                <View style={styles.blackBox}></View>
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
    imageText: {
        fontSize: 18,
        marginBottom: 10,
    },
    imageContainer: {
        width: '20%',
        height: 70,
        backgroundColor: 'black',
    },
    separator: {
        height: 20, // Espacio vertical
    },
    inputContainer: {
        width: '80%', // Ancho del inputContainer
        // Ocupa la mitad de la altura disponible
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
    blackBoxContainer: {
        flexDirection: 'row', // Muestra los recuadros en una fila
        justifyContent: 'space-between', // Espacio entre los recuadros
        width: '80%', // Ancho del inputContainer
        marginVertical: 10, // Espacio vertical
    },
    blackBox: {
        width: '30%', // Ancho del recuadro negro
        height: 70, // Altura del recuadro negro
        backgroundColor: 'black',
    },
});

export default ManualEntryScreen;






