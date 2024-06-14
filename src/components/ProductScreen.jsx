import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import { appFirebase } from './Firebase-config';

const db = getFirestore(appFirebase);

const ProductScreen = ({ route }) => {
    const { item } = route.params;
    const [isEditing, setIsEditing] = useState(false);
    const [productName, setProductName] = useState(item.productName);
    const [brand, setBrand] = useState(item.marca);
    const [category, setCategory] = useState(item.categoria);
    const [size, setSize] = useState(item.tamanio);
    const [description, setDescription] = useState(item.descripcion);
    const [ingredients, setIngredients] = useState(item.imgredientes);
    const [information, setInformation] = useState(item.informacion);
    const [nutritionInformation, setNutritionInformation] = useState(item.infoNutricional);

    const handleSave = async () => {
        try {
            const docRef = doc(db, 'productos', item.id);
            await updateDoc(docRef, {
                productName,
                marca: brand,
                categoria: category,
                tamanio: size,
                descripcion: description,
                imgredientes: ingredients,
                informacion: information,
                infoNutricional: nutritionInformation,
            });
            setIsEditing(false);
        } catch (error) {
            console.error('Error saving data to Firestore:', error);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.iconContainer}>
                    {item.foto && <Image source={{ uri: item.foto }} style={styles.image} />}
                </View>
                <View style={styles.infoContainer}>
                    <TouchableOpacity
                        style={styles.editIcon}
                        onPress={() => {
                            if (isEditing) {
                                handleSave();
                            }
                            setIsEditing(!isEditing);
                        }}
                    >
                        {isEditing ? (
                            <Ionicons name="checkmark" size={34} color="black" />
                        ) : (
                            <MaterialCommunityIcons name="pencil-outline" size={34} color="black" />
                        )}
                    </TouchableOpacity>
                    <View style={styles.infoItem}>
                        <Text style={styles.label}>Nombre del alimento:</Text>
                        <TextInput
                            style={styles.value}
                            value={productName}
                            onChangeText={setProductName}
                            editable={isEditing}
                        />
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.label}>Marca:</Text>
                        <TextInput
                            style={styles.value}
                            value={brand}
                            onChangeText={setBrand}
                            editable={isEditing}
                        />
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.label}>Categoría:</Text>
                        <TextInput
                            style={styles.value}
                            value={category}
                            onChangeText={setCategory}
                            editable={isEditing}
                        />
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.label}>Tamaño:</Text>
                        <TextInput
                            style={styles.value}
                            value={size}
                            onChangeText={setSize}
                            editable={isEditing}
                        />
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.label}>Descripción:</Text>
                        <TextInput
                            style={styles.value}
                            value={description}
                            onChangeText={setDescription}
                            editable={isEditing}
                        />
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.label}>Ingredientes:</Text>
                        <TextInput
                            style={styles.value}
                            value={ingredients}
                            onChangeText={setIngredients}
                            editable={isEditing}
                            multiline
                        />
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.label}>Caducidad:</Text>
                        <TextInput
                            style={styles.value}
                            value={information}
                            onChangeText={setInformation}
                            editable={isEditing}
                        />
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.label}>Información Nutricional:</Text>
                        <TextInput
                            style={styles.value}
                            value={nutritionInformation}
                            onChangeText={setNutritionInformation}
                            editable={isEditing}
                            multiline
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollViewContent: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: 20,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginBottom: 16,
    },
    infoContainer: {
        width: '80%',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#f2f2f2',
        borderRadius: 10,
        marginBottom: 20,
        position: 'relative',
    },
    editIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    infoItem: {
        marginBottom: 12,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    value: {
        fontSize: 14,
        color: '#555',
        backgroundColor: '#f2f2f2',
        padding: 4,
    },
});

export default ProductScreen;


