import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView, Alert, ActivityIndicator, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { appFirebase } from './Firebase-config';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const { width } = Dimensions.get('window');

const storage = getStorage(appFirebase);
const db = getFirestore(appFirebase);

const CreateRecipe = () => {
    const [ingredients, setIngredients] = useState('');
    const [steps, setSteps] = useState('');
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [nameRecipe, setNameRecipe] = useState('');

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
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.assets[0].uri);
        }
    };

    const uploadImage = async (uri) => {
        try {
            const response = await fetch(uri);
            const blob = await response.blob();
            const imageRef = ref(storage, `images/${Date.now()}.jpg`);
            await uploadBytes(imageRef, blob);
            return await getDownloadURL(imageRef);
        } catch (error) {
            console.error('Error uploading image:', error);
            throw error;
        }
    };

    const saveRecipeToFirestore = async (imageUrl, userId) => {
        try {
            const recipe = {
                name: nameRecipe,
                ingredients: ingredients,
                steps: steps,
                image: imageUrl,
                userId: userId,
            };
            await addDoc(collection(db, 'recetas'), recipe);
        } catch (error) {
            console.error('Error saving recipe to Firestore:', error);
        }
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            const auth = getAuth(appFirebase);
            const userId = auth.currentUser ? auth.currentUser.uid : null;
            let imageUrl = null;
            if (image) {
                imageUrl = await uploadImage(image);
            }
            await saveRecipeToFirestore(imageUrl, userId);
            Alert.alert('Receta guardada', 'La receta se guardó correctamente.');
            setIngredients('');
            setSteps('');
            setImage(null);
        } catch (error) {
            console.error('Error al guardar la receta:', error);
            Alert.alert('Error', 'Hubo un problema al guardar la receta. Por favor, inténtalo de nuevo.');
        }
        setLoading(false);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={pickImage} style={styles.iconContainer}>
                {image ? (
                    <Image source={{ uri: image }} style={styles.image} />
                ) : (
                    <Ionicons name="image-outline" size={150} color="black" />
                )}
            </TouchableOpacity>

            <ScrollView contentContainerStyle={styles.inputContainer}>
            <Text style={styles.label}>Nombre:</Text>
                <TextInput
                    style={styles.input2}
                    placeholder="Nombre de la receta"
                    value={nameRecipe}
                    onChangeText={setNameRecipe}
                />
            <Text style={styles.label}>Ingredientes:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ingredientes"
                    value={ingredients}
                    onChangeText={setIngredients}
                    multiline
                />
                <Text style={styles.label}>Pasos a seguir:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Pasos a Seguir"
                    value={steps}
                    onChangeText={setSteps}
                    multiline
                />
            </ScrollView>

            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                {loading ? (
                    <ActivityIndicator size="small" color="#0000ff" />
                ) : (
                    <Ionicons name="checkmark" size={50} color="black" />
                )}
            </TouchableOpacity>
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
    iconContainer: {
        marginBottom: 10,
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 10,
    },
    inputContainer: {
        height: '80%',
        width: width * 0.8,
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: '#f2f2f2',
        borderRadius: 10,
    },
    input: {
        height: 100,
        width: '100%',
        paddingHorizontal: 8,
        marginBottom: 10,
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        textAlignVertical: 'top',
    },
    saveButton: {
        position: 'absolute',
        bottom: 30,
    },
    input2: {
        height: 40,
        width: '100%',
        paddingHorizontal: 8,
        marginBottom: 10,
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        textAlignVertical: 'top',
    },
});

export default CreateRecipe;
