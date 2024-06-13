import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Text, TextInput, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { appFirebase } from './Firebase-config';
import { useNavigation } from '@react-navigation/native';

const FoodListScreen = () => {
    const [foodList, setFoodList] = useState([]);
    const [selectedMenu, setSelectedMenu] = useState('Todo');
    const [userId, setUserId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const navigation = useNavigation();

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
        if (userId) {
            fetchFoodData();
        }
    }, [selectedMenu, userId]);

    const fetchFoodData = async () => {
        try {
            const db = getFirestore(appFirebase);
            let q;
            if (selectedMenu === 'Todo') {
                q = query(collection(db, 'productos'), where('userId', '==', userId));
            } else {
                q = query(collection(db, 'productos'), where('userId', '==', userId), where('sitio', '==', selectedMenu));
            }
            const snapshot = await getDocs(q);
            const foods = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setFoodList(foods);
        } catch (error) {
            console.error('Error fetching food data:', error);
        }
    };

    const handleItemPress = (item) => {
        navigation.navigate('ProductScreen', { item });
    };

    const renderMenuItem = ({ item }) => (
        <TouchableOpacity
            style={[styles.menuItem, item === selectedMenu && styles.selectedMenuItem]}
            onPress={() => setSelectedMenu(item)}>
            <Text style={styles.menuText}>{item}</Text>
        </TouchableOpacity>
    );

    const renderItem = ({ item }) => {
        // Filtrar productos basado en el término de búsqueda
        if (searchTerm !== '' && !item.productName.toLowerCase().includes(searchTerm.toLowerCase())) {
            return null;
        }

        return (
            <TouchableOpacity onPress={() => handleItemPress(item)}>
                <View style={styles.foodItem} key={item.id}>
                    <Text style={styles.foodName}>{item.productName}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Buscar..."
                value={searchTerm}
                onChangeText={setSearchTerm}
            />
            <View style={styles.menuContainer}>
                <FlatList
                    data={['Todo', 'Refrigerador', 'Congelador', 'Gabinete']}
                    renderItem={renderMenuItem}
                    keyExtractor={(item) => item}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
            </View>
            <FlatList
                data={foodList}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
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
        height: 50, 
        marginBottom: 10, 
    },
    menuItem: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginRight: 10,
        borderRadius: 20,
        backgroundColor: '#f2f2f2',
    },
    selectedMenuItem: {
        backgroundColor: '#007bff',
    },
    menuText: {
        color: '#000',
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
