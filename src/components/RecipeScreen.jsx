import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';

const RecipeScreen = ({ route }) => {
    const { recipe } = route.params;
    const [fav, setFav] = useState('no');

    const toggleFavorite = () => {
        setFav(prevFav => (prevFav === 'no' ? 'si' : 'no'));
    };

    const handleShare = async () => {
        const recipeText = `*Receta:*\n ${recipe.name}\n\n*Ingredientes:*\n${recipe.ingredients}\n\n*Pasos a seguir:*\n${recipe.steps}`;
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
                            {fav === 'no' ? (
                                <Ionicons name="bookmark-outline" size={26} color="black" />
                            ) : (
                                <Ionicons name="bookmark" size={26} color="#800000" />
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
        alignItems: 'center', // Center the content within the container
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 16,
    },
    headerText: {
        fontSize: 22,
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
