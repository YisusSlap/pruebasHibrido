import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, Modal, Image, Button } from 'react-native';
import Constants from 'expo-constants';
import StyleText from './StyleText';

const { width } = Dimensions.get('window');
const CELL_WIDTH = (width - 130) / 3; // El ancho de la celda se ajusta restando 40 píxeles (10 píxeles de espacio a cada lado de la celda) y dividiendo por 3
const CELL_HEIGHT = CELL_WIDTH;

const WelcomeScreen = () => {
  const [showModal, setShowModal] = useState(true);

  const closeModal = () => {
    setShowModal(false);
  };

  const renderGrid = () => {
    const grid = [];
    for (let i = 0; i < 7; i++) {
      const row = [];
      for (let j = 0; j < 3; j++) {
        row.push(
          <View key={`${i}-${j}`} style={styles.cell}></View>
        );
      }
      grid.push(
        <View key={i} style={styles.row}>
          {row}
        </View>
      );
    }
    return grid;
  };

  return (
    <View style={styles.container}>
      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image source={require('./logoAlma.png')} style={styles.logo} />
            <StyleText style={styles.title}>Bienvenido</StyleText>
            <View style={styles.descriptionContainer}>
              <StyleText>AlmaZen es una aplicación diseñada para ayudarte a diseñar un menú adaptado a tu alacena</StyleText>
            </View>
            <View style={styles.imageContainer}>
              <Image source={require('./chef.png')} style={styles.welcomeImage} />
            </View>
            <Button title="Cerrar" onPress={closeModal} />
          </View>
        </View>
      </Modal>

      {/* Grid */}
      {renderGrid()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fce4cc', // Fondo de la ventana rojo
    marginTop: Constants.statusBarHeight
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo oscuro transparente para el modal
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '90%',
    height: '80%',
  },
  logo: {
    width: 200,
    height: 160,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  descriptionContainer: {
    marginVertical: 10,
  },
  welcomeImage: {
    width: 100,
    height: 100,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 11, // Espacio entre filas
  },
  cell: {
    backgroundColor: '#cbcbcb',
    width: CELL_WIDTH,
    height: CELL_HEIGHT,
    marginHorizontal: 11, // Espacio horizontal entre celdas
  },
});

export default WelcomeScreen;