import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, Modal, Image, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import StyleText from './StyleText';
import { Ionicons } from '@expo/vector-icons'; // Importa Ionicons desde expo-vector-icons
import Swiper from 'react-native-swiper';

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
            {/* Botón de cierre */}
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
            <Image source={require('./logoAlma.png')} style={styles.logo} />
            <StyleText style={styles.title}>Bienvenido</StyleText>
            <View style={styles.descriptionContainer}>
              <StyleText>AlmaZen es una aplicación diseñada para ayudarte a diseñar un menú adaptado a tu alacena.</StyleText>
            </View>
            {/* Aumento del tamaño de la imagen */}
            <View style={styles.imageContainer}>
              <Image source={require('./chef.png')} style={styles.welcomeImage} />
            </View>
          </View>
        </View>
      </Modal>

      {/* ViewPager */}
      <Swiper style={styles.wrapper} showsButtons={false} loop={false}>
        <View style={styles.slide}>
          {renderGrid()}
        </View>
        <View style={styles.slide}>
          {/* Contenido de la segunda página del ViewPager */}
          <StyleText>Segunda Página</StyleText>
        </View>
        <View style={styles.slide}>
          {/* Contenido de la tercera página del ViewPager */}
          <StyleText>Tercera Página</StyleText>
        </View>
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  logo: {
    width: 200,
    height: 160,
  },
  title: {
    fontSize: 32, // Aumento del tamaño del texto
    fontWeight: 'bold',
    marginTop: 10,
  },
  descriptionContainer: {
    marginVertical: 10,
  },
  welcomeImage: {
    width: 200, // Ajuste del tamaño de la imagen
    height: 200, // Ajuste del tamaño de la imagen
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
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default WelcomeScreen;
