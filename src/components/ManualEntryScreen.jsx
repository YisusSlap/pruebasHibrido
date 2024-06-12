import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, Text, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons, FontAwesome, SimpleLineIcons, Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { appFirebase } from './Firebase-config';
import { getAuth } from 'firebase/auth';
import { getFirestore, addDoc, collection } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';


const db = getFirestore(appFirebase);
const storage = getStorage(appFirebase);

const ManualEntryScreen = () => {
    const [foodName, setFoodName] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [size, setSize] = useState('');
    const [description, setDescription] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [information, setInformation] = useState('');
    const [nutritionInformation, setNutritionInformation] = useState('');
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [lugar, setLugar] = useState('afuera');

    const [showSavedMessage, setShowSavedMessage] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== 'granted') {
                alert('Lo siento, necesitamos permisos de cámara para que esto funcione!');
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [3, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const uploadImage = async (uri) => {
        try {
            // Fetch the image from the given URI
            const response = await fetch(uri);
            // Convert the image response to a Blob
            const blob = await response.blob();

            // Create a reference to the storage location
            const refArchivo = ref(storage, `images/${Date.now()}.jpg`);

            // Upload the blob to Firebase Storage
            await uploadBytes(refArchivo, blob);

            // Get the download URL
            return await getDownloadURL(refArchivo);
        } catch (error) {
            console.error('Error uploading image:', error);
            throw error;
        }
    };

    const saveDataToFirestore = async (imageUrl, userId) => {
        try {
            const info = {
                productName: foodName,
                marca: brand,
                categoria: category,
                tamanio: size,
                descripcion: description,
                imgredientes: ingredients,
                informacion: information,
                infoNutricional: nutritionInformation,
                foto: imageUrl,
                sitio: lugar,
                userId: userId,
            };
            await addDoc(collection(db, 'productos'), { ...info });
        } catch (error) {
            console.error('Error saving data to Firestore:', error);
        }
    };

    const handleSave = () => {
        Alert.alert(
            "Guardar Cambios",
            `¿Desea guardar los siguientes cambios?\n\n` +
            `Nombre del alimento: ${foodName}\n` +
            `Marca: ${brand}\n` +
            `Categoría: ${category}\n` +
            `Tamaño: ${size}\n` +
            `Descripción: ${description}\n` +
            `Ingredientes: ${ingredients}\n` +
            `Información: ${information}\n` +
            `Información nutrimental: ${nutritionInformation}`,
            [
                {
                    text: "Cancelar",
                    style: "cancel",
                },
                {
                    text: "Aceptar",
                    onPress: async () => {
                        setLoading(true);
                        try {
                            const auth = getAuth(appFirebase);
                            const userId = auth.currentUser ? auth.currentUser.uid : null;
                            let imageUrl = null;
                            if (image) {
                                imageUrl = await uploadImage(image);
                            }
                            await saveDataToFirestore(imageUrl, userId);
                            setShowSavedMessage(true);
                            setTimeout(() => setShowSavedMessage(false), 3000); // para ocultar el mensaje después de 3 segundos
                        } catch (error) {
                            console.error("Error al guardar los datos: ", error);
                        }
                        setLoading(false);
                    },
                },
            ]
        );
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Ionicons name="checkmark" size={30} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={pickImage} style={styles.iconContainer}>
                {image ? (
                    <Image source={{ uri: image }} style={styles.image} />
                ) : (
                    <Ionicons name="image-outline" size={100} color="black" />
                )}
            </TouchableOpacity>
            <View style={styles.separator}></View>
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
            <View style={styles.bottomIconContainer}>
                <MaterialCommunityIcons
                    name="fridge-outline"
                    size={50}
                    color="black"
                    onPress={() => setLugar('Refrigerador')}
                />
                <FontAwesome
                    name="snowflake-o"
                    size={50}
                    color="black"
                    onPress={() => setLugar('Congelador')}
                />
                <SimpleLineIcons
                    name="drawer"
                    size={50}
                    color="black"
                    onPress={() => setLugar('Gabinete')}
                />
            </View>
            {showSavedMessage && (
                <View style={styles.savedMessageContainer}>
                    <Text style={styles.savedMessage}>Producto guardado</Text>
                </View>
            )}
            {loading && (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    saveButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    iconContainer: {
        width: '100%',
        alignItems: 'center',
        
    },
    separator: {
        height: 20,
    },
    inputContainer: {
        width: '80%',
        paddingHorizontal: 20,
        paddingVertical: 10,
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '70%',
        marginVertical: 10,
    },
    savedMessageContainer: {
        position: 'absolute',
        bottom: 10,
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 5,
    },
    savedMessage: {
        color: 'white',
    },
    loadingContainer: {
        ...StyleSheet.absoluteFill,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ManualEntryScreen;
