import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { appFirebase } from './Firebase-config';

const RecetasScreen = () => {
    const navigation = useNavigation();
    const [recetas, setRecetas] = useState([]);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const auth = getAuth(appFirebase);
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserId(user.uid);
            } else {
                setUserId(null);
            }
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const fetchRecetas = async () => {
            const db = getFirestore(appFirebase);
            const q = query(collection(db, 'recetas'), where('userId', '==', userId));

            try {
                const querySnapshot = await getDocs(q);
                const recetasData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setRecetas(recetasData);
            } catch (error) {
                console.error('Error fetching recetas:', error);
            }
        };

        fetchRecetas();
    }, [userId]);

    const handleAgregarReceta = () => {
        navigation.navigate('CreateRecipe');
    };

    const handleVerReceta = (recipe) => {
        navigation.navigate('RecipeScreen', { recipe });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Mis Recetas</Text>
            <TouchableOpacity style={styles.addButton} onPress={handleAgregarReceta}>
                <Ionicons name="add-circle" size={28} color="#800000" />
                <Text style={styles.recetasCreadasText}> Añadir receta</Text>
            </TouchableOpacity>

            <Text style={styles.recetasCreadasText}>Recetas Creadas</Text>

            <FlatList
                data={recetas}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.recetaItem} onPress={() => handleVerReceta(item)}>
                        <Text>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: Constants.statusBarHeight,
        paddingVertical: 16,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    recetasCreadasText: {
        fontSize: 20,
    },
    recetaItem: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        width: '100%',
        alignItems: 'center',
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
});

export default RecetasScreen;
