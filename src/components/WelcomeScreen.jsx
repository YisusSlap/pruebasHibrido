import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Modal, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import Constants from 'expo-constants';
import StyleText from './StyleText';
import Swiper from 'react-native-swiper';
import { Ionicons } from '@expo/vector-icons';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { appFirebase } from './Firebase-config';
import { useNavigation, useIsFocused } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const CELL_WIDTH = (width - 130) / 3;

const WelcomeScreen = () => {
  const [showModal, setShowModal] = useState(true);
  const [productsPages, setProductsPages] = useState([[], [], []]); // Estado para almacenar los productos de cada página
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false); // Estado para controlar la carga de productos
  const navigation = useNavigation();
  const isFocused = useIsFocused(); // Hook para saber si la pantalla está enfocada

  useEffect(() => {
    const auth = getAuth(appFirebase);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        if (isFocused) {
          fetchProducts(user.uid);
        }
      } else {
        setUserId(null);
        setProductsPages([[], [], []]); // Limpiar los productos si el usuario no está autenticado
      }
    });

    return () => unsubscribe();
  }, [isFocused]);

  const fetchProducts = async (userId) => {
    setLoading(true); // Iniciar la carga de productos
    try {
      const db = getFirestore(appFirebase);
      // Consulta para obtener todos los productos del usuario actual
      const q = query(collection(db, 'productos'), where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
      const productsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        foto: doc.data().foto, // Se asume que 'foto' es el campo que contiene la URL de la imagen
      }));

      // Dividir los productos en páginas secuencialmente
      const pages = [[], [], []]; // Inicializar un array de arrays para cada página
      let pageIndex = 0;
      productsData.forEach((product) => {
        pages[pageIndex].push(product);
        if (pages[pageIndex].length === 21) { // 7 filas * 3 columnas = 21 celdas por página
          pageIndex++;
        }
      });

      setProductsPages(pages); // Actualizar el estado con los productos divididos en páginas
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false); // Finalizar la carga de productos
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const renderGrid = (pageNumber) => {
    const grid = [];
    for (let i = 0; i < 7; i++) {
      const row = [];
      for (let j = 0; j < 3; j++) {
        // Calcular el índice del producto en el grid
        const index = i * 3 + j;
        if (productsPages[pageNumber][index]) {
          row.push(
            <View key={`${i}-${j}`} style={styles.cell}>
              <Image source={{ uri: productsPages[pageNumber][index].foto }} style={styles.productImage} />
            </View>
          );
        } else {
          row.push(
            <View key={`${i}-${j}`} style={styles.cell}></View>
          );
        }
      }
      grid.push(
        <View key={i} style={styles.row}>
          {row}
        </View>
      );
    }
    return grid;
  };

  // if (loading) {
  //   return (
  //     <View style={[styles.container, styles.loadingContainer]}>
  //       <ActivityIndicator size="large" color="#0000ff" />
  //     </View>
  //   );
  // }

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
          {renderGrid(0)} 
        </View>
        <View style={styles.slide}>
          {renderGrid(1)} 
        </View>
        <View style={styles.slide}>
          {renderGrid(2)} 
        </View>
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    backgroundColor: '#fce4cc', // Fondo blanco para evitar superposiciones con el SVG
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 10,
  },
  descriptionContainer: {
    marginVertical: 10,
  },
  welcomeImage: {
    width: 200,
    height: 200,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 11,
  },
  cell: {
    backgroundColor: '#cbcbcb',
    width: CELL_WIDTH,
    height: CELL_WIDTH,
    marginHorizontal: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  productImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 8,
  },
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default WelcomeScreen;
