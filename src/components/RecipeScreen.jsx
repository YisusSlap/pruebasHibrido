import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { appFirebase } from './Firebase-config';

const RecipeScreen = ({ route, navigation }) => {
    const { recipe } = route.params;
    const [fav, setFav] = useState(recipe.favorito);

    const db = getFirestore(appFirebase); // Obtener instancia de Firestore
    const auth = getAuth(appFirebase); // Obtener instancia de autenticación

    // Actualizar el estado de favorito en Firestore cuando cambie 'fav'
    const updateFavoriteStatus = async () => {
        try {
            const userId = auth.currentUser ? auth.currentUser.uid : null;
            if (userId) {
                const recipeRef = doc(db, 'recetas', recipe.id);
                await updateDoc(recipeRef, { favorito: fav });
            } else {
                console.error('User not authenticated');
            }
        } catch (error) {
            console.error('Error updating document:', error.message);
        }
    };

    useEffect(() => {
        // Actualizar favorito al montar el componente
        updateFavoriteStatus();
    }, [fav]); // Dependencias para el useEffect

    const toggleFavorite = () => {
        const newFav = !fav;
        setFav(newFav);
        updateFavoriteStatus(newFav);
    };

    const handleShare = async () => {
        const recipeText = `*Receta:*\n${recipe.name}\n\n*Ingredientes:*\n${recipe.ingredients}\n\n*Pasos a seguir:*\n${recipe.steps}`;
        await Clipboard.setStringAsync(recipeText);
        Alert.alert('Texto copiado', 'La receta se ha copiado al portapapeles.');
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {recipe.image && (
                <Image source={{ uri: recipe.image }} style={styles.image} />
            )}
            <View style={styles.contentContainer}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>{recipe.name}</Text>
                    <View style={styles.iconContainer}>
                        <TouchableOpacity onPress={toggleFavorite}>
                            {fav ? (
                                <Ionicons name="bookmark" size={26} color="#800000" />
                            ) : (
                                <Ionicons name="bookmark-outline" size={26} color="black" />
                            )}
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleShare}>
                            <MaterialCommunityIcons name="share-variant-outline" size={26} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
                <Text style={styles.label}>Ingredientes:</Text>
                <Text style={styles.content}>{recipe.ingredients}</Text>
                <Text style={styles.label}>Pasos a seguir:</Text>
                <Text style={styles.content}>{recipe.steps}</Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
    },
    image: {
        width: '80%',
        height: 200,
        marginBottom: 16,
    },
    contentContainer: {
        width: '90%',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#f2f2f2',
        borderRadius: 10,
        alignItems: 'center', // Centrar el contenido dentro del contenedor
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 16,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    iconContainer: {
        flexDirection: 'row',
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    content: {
        fontSize: 16,
        marginBottom: 12,
    },
});

export default RecipeScreen;
