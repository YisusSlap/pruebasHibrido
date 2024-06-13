import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';

const ProductScreen = ({ route }) => {
    const { item } = route.params;
    
    console.log("URL de la imagen:", item.foto); // Log para verificar la URL

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.iconContainer}>
                    {item.foto && <Image source={{ uri: item.foto }} style={styles.image} />}
                </View>
                
                <View style={styles.infoContainer}>
                    <View style={styles.infoItem}>
                        <Text style={styles.label}>Nombre del alimento:</Text>
                        <Text style={styles.value}>{item.productName}</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.label}>Marca:</Text>
                        <Text style={styles.value}>{item.marca}</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.label}>Categoría:</Text>
                        <Text style={styles.value}>{item.categoria}</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.label}>Tamaño:</Text>
                        <Text style={styles.value}>{item.tamanio}</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.label}>Descripción:</Text>
                        <Text style={styles.value}>{item.descripcion}</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.label}>Ingredientes:</Text>
                        <Text style={styles.value}>{item.imgredientes}</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.label}>Información:</Text>
                        <Text style={styles.value}>{item.informacion}</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.label}>Información Nutricional:</Text>
                        <Text style={styles.value}>{item.infoNutricional}</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        
    },
    scrollViewContent: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: 20,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginBottom: 16,
    },
    infoContainer: {
        width: '80%',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#f2f2f2',
        borderRadius: 10,
        marginBottom: 20,
    },
    infoItem: {
        marginBottom: 12,
    },
    label: {
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    value: {
        fontSize: 10,
        color: '#555',
    },
});

export default ProductScreen;
