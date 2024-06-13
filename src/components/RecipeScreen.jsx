import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

const RecipeScreen = ({ route }) => {
    const { recipe } = route.params;

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {recipe.image && (
                <Image source={{ uri: recipe.image }} style={styles.image} />
            )}
            <Text style={styles.headerText}>{recipe.name}</Text>
            <Text style={styles.label}>Ingredientes:</Text>
            <Text style={styles.content}>{recipe.ingredients}</Text>
            <Text style={styles.label}>Pasos a seguir:</Text>
            <Text style={styles.content}>{recipe.steps}</Text>
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
        width: '100%',
        height: 200,
        marginBottom: 16,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
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
