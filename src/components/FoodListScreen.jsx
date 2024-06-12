import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Text, TextInput, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { appFirebase } from './Firebase-config';

const FoodListScreen = () => {
    const [foodList, setFoodList] = useState([]);
    const [selectedMenu, setSelectedMenu] = useState('Todo');
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
        if (selectedMenu === 'Todo' && userId) {
            fetchFoodData();
        }
    }, [selectedMenu, userId]);

    const fetchFoodData = async () => {
        try {
            const db = getFirestore();
            const q = query(collection(db, 'productos'), where('userId', '==', userId));
            const snapshot = await getDocs(q);
            const foods = snapshot.docs.map(doc => doc.data().productName);
            setFoodList(foods);
        } catch (error) {
            console.error('Error fetching food data:', error);
        }
    };

    const handleAddFood = (food) => {
        setFoodList([...foodList, food]);
    };

    const renderMenuItem = ({ item }) => (
        <TouchableOpacity
            style={[styles.menuItem, item === selectedMenu && styles.selectedMenuItem]}
            onPress={() => setSelectedMenu(item === selectedMenu ? 'Todo' : item)}>
            <Text style={styles.menuText}>{item}</Text>
        </TouchableOpacity>
    );

    const renderItem = ({ item }) => (
        <View style={styles.foodItem} key={item}>
            <Text style={styles.foodName}>{item}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Input para el buscador */}
            <TextInput
                style={styles.searchInput}
                placeholder="Buscar..."
            />
            {/* Menú horizontal */}
            <View style={styles.menuContainer}>
                <FlatList
                    data={['Todo', 'Refrigerador', 'Congelador', 'Gabinete']}
                    renderItem={renderMenuItem}
                    keyExtractor={(item) => item}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
            </View>
            {/* Lista de alimentos */}
            <FlatList
                data={foodList}
                renderItem={renderItem}
                keyExtractor={(item) => item}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        marginTop: Constants.statusBarHeight,
    },
    searchInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    menuContainer: {
        height: 50, // Altura del menú horizontal
        marginBottom: 10, // Espacio entre el buscador y el menú
    },
    menuItem: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginRight: 10,
        borderRadius: 20,
    },
    selectedMenuItem: {
        backgroundColor: '#007bff',
    },
    menuText: {
        color: '#000',
    },
    selectedMenuText: {
        color: '#fff',
    },
    foodItem: {
        padding: 12,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        marginBottom: 8,
    },
    foodName: {
        fontSize: 16,
    },
});

export default FoodListScreen;