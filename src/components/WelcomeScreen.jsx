import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Modal, Image, TouchableOpacity, Alert } from 'react-native';
import Constants from 'expo-constants';
import StyleText from './StyleText';
import Swiper from 'react-native-swiper';
import { Ionicons } from '@expo/vector-icons';
import { getFirestore, collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { getStorage, ref, deleteObject } from 'firebase/storage';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { LongPressGestureHandler, State } from 'react-native-gesture-handler';
import { appFirebase } from './Firebase-config';
import * as Notifications from 'expo-notifications';

const { width } = Dimensions.get('window');
const CELL_WIDTH = (width - 130) / 3;

const WelcomeScreen = () => {
  const [showModal, setShowModal] = useState(true);
  const [showExpirationModal, setShowExpirationModal] = useState(false);
  const [expiringProduct, setExpiringProduct] = useState(null);
  const [productsPages, setProductsPages] = useState([[], [], []]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

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
        setProductsPages([[], [], []]);
      }
    });

    return () => unsubscribe();
  }, [isFocused]);

  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('No se concedieron permisos para las notificaciones');
      }
    };

    requestPermissions();
  }, []);

  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(notification => {
      console.log('Notification received:', notification);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const fetchProducts = async (userId) => {
    setLoading(true);
    try {
      const db = getFirestore(appFirebase);
      const q = query(collection(db, 'productos'), where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
      const productsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        foto: doc.data().foto,
        productName: doc.data().productName,
        informacion: doc.data().informacion,
      }));

      checkExpirationDates(productsData);

      const pages = [[], [], []];
      let pageIndex = 0;
      productsData.forEach((product) => {
        pages[pageIndex].push(product);
        if (pages[pageIndex].length === 21) {
          pageIndex++;
        }
      });

      setProductsPages(pages);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkExpirationDates = (products) => {
    const currentDate = new Date();
    for (const product of products) {
      const expirationDate = new Date(product.informacion);
      const diffInDays = Math.ceil((expirationDate - currentDate) / (1000 * 60 * 60 * 24));

      console.log(`Product: ${product.productName}, Expiration: ${product.informacion}, Days left: ${diffInDays}`);

      if (diffInDays <= 2) {
        setExpiringProduct(product);
        setShowExpirationModal(true);
        sendNotification(product.productName, product.informacion);
        break;  // Sólo mostrar la primera coincidencia
      }
    }
  };

  const sendNotification = async (productName, expirationDate) => {
    console.log(`Sending notification for ${productName} which expires on ${expirationDate}`);
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Producto Próximo a Caducar',
        body: `${productName} caducará el ${expirationDate}`,
      },
      trigger: null,
    });
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const closeExpirationModal = () => {
    setShowExpirationModal(false);
  };

  const handleDeleteProduct = async (productId, imageUrl) => {
    try {
      const db = getFirestore(appFirebase);
      const productRef = doc(db, 'productos', productId);
      await deleteDoc(productRef);

      const storage = getStorage(appFirebase);
      const imageRef = ref(storage, imageUrl);
      await deleteObject(imageRef);

      const updatedProducts = productsPages.flat().filter(product => product.id !== productId);
      const updatedPages = [[], [], []];
      let pageIndex = 0;
      updatedProducts.forEach((product) => {
        updatedPages[pageIndex].push(product);
        if (updatedPages[pageIndex].length === 21) {
          pageIndex++;
        }
      });
      setProductsPages(updatedPages);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const renderGrid = (pageNumber) => {
    const grid = [];
    for (let i = 0; i < 7; i++) {
      const row = [];
      for (let j = 0; j < 3; j++) {
        const index = i * 3 + j;
        if (productsPages[pageNumber][index]) {
          row.push(
            <LongPressGestureHandler
              key={`${i}-${j}`}
              onHandlerStateChange={({ nativeEvent }) => {
                if (nativeEvent.state === State.ACTIVE) {
                  const productId = productsPages[pageNumber][index].id;
                  const imageUrl = productsPages[pageNumber][index].foto;
                  Alert.alert(
                    'Confirmación',
                    '¿Estás seguro de que quieres eliminar este producto?',
                    [
                      {
                        text: 'Cancelar',
                        style: 'cancel'
                      },
                      {
                        text: 'Eliminar',
                        style: 'destructive',
                        onPress: () => handleDeleteProduct(productId, imageUrl),
                      }
                    ]
                  );
                }
              }}
              minDurationMs={800}
            >
              <View style={styles.cell}>
                <Image source={{ uri: productsPages[pageNumber][index].foto }} style={styles.productImage} />
              </View>
            </LongPressGestureHandler>
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

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
            <Image source={require('./logoAlma.png')} style={styles.logo} />
            <StyleText style={styles.title}>Bienvenido</StyleText>
            <View style={styles.descriptionContainer}>
              <StyleText>AlmaZen es una aplicación diseñada para ayudarte a diseñar un menú adaptado a tu alacena.</StyleText>
            </View>
            <View style={styles.imageContainer}>
              <Image source={require('./chef.png')} style={styles.welcomeImage} />
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showExpirationModal}
        onRequestClose={closeExpirationModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={closeExpirationModal}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
            {expiringProduct && (
              <>
                <StyleText style={styles.title}>Producto Próximo a Caducar</StyleText>
                <Image source={{ uri: expiringProduct.foto }} style={styles.expiringProductImage} />
                <StyleText>{expiringProduct.productName}</StyleText>
                <StyleText>Caduca el: {expiringProduct.informacion}</StyleText>
              </>
            )}
          </View>
        </View>
      </Modal>

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
    backgroundColor: '#fccccc',
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
    backgroundColor: '#f1f1f1',
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
  expiringProductImage: {
    width: 200,
    height: 200,
    borderRadius: 8,
    marginVertical: 10,
  },
});

export default WelcomeScreen;

