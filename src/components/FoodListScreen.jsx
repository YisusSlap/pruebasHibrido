import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';

const FoodListScreen = () => {
    const [foodList, setFoodList] = useState([]);

    const handleAddFood = (food) => {
        setFoodList([...foodList, food]);
    };

    const renderItem = ({ item }) => (
        <View style={styles.foodItem}>
            <Text style={styles.foodName}>{item.name}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
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