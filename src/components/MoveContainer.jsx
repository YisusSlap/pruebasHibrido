import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';

const MoveContainer = () => {
    const [searchText, setSearchText] = useState('');

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Escribe aquí..."
                value={searchText}
                onChangeText={setSearchText}
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button}>
                    <Image source={require('./assets/button1.png')} style={styles.buttonImage} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Image source={require('./assets/button2.png')} style={styles.buttonImage} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Image source={require('./assets/button3.png')} style={styles.buttonImage} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    searchInput: {
        height: 40,
        borderWidth: 1,
        borderColor: 'gray',
        padding: 8,
        marginBottom: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    button: {
        padding: 8,
    },
    buttonImage: {
        width: 50,
        height: 50,
    },
});

export default MoveContainer;