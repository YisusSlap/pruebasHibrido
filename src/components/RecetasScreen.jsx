import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { appFirebase } from './Firebase-config'; // Asegúrate de importar la configuración de Firebase adecuada

const RecetasScreen = () => {
    const navigation = useNavigation();
    const [recetas, setRecetas] = useState([]);

    useEffect(() => {
        const fetchRecetas = async () => {
            const db = getFirestore(appFirebase);
            const recetasRef = collection(db, 'recetas');
            const q = query(recetasRef);

            try {
                const querySnapshot = await getDocs(q);
                const recetasData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setRecetas(recetasData);
            } catch (error) {
                console.error('Error fetching recetas:', error);
                // Puedes manejar el error aquí según tu lógica de la aplicación
            }
        };

        fetchRecetas();
    }, []);

    // Función para manejar la acción de añadir receta (aquí podrías navegar a la pantalla de creación de receta)
    const handleAgregarReceta = () => {
        navigation.navigate('CreateRecipe');
    };

    return (
        <View style={styles.container}>
            
            <Text style={styles.headerText}>Mis Recetas</Text>
            <View style={styles.header}>
                <TouchableOpacity style={styles.addButton} onPress={handleAgregarReceta}>
                    <Ionicons name="add-circle" size={28} color="#800000" />
                    <Text style={styles.recetasCreadasText}> Añadir receta</Text>
                </TouchableOpacity>
            </View>

            
            <Text style={styles.recetasCreadasText}>Recetas Creadas</Text>

            
            <FlatList
                data={recetas}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.recetaItem}>
                        <Text>{item.name}</Text>
                    </View>
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
        paddingVertical: 16
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    recetasCreadasText: {
        fontSize: 20,
    },
    recetaItem: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc', // Color de borde gris claro, ajusta según tu paleta de colores
    },
    addButton: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default RecetasScreen;
