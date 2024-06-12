import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Constants from 'expo-constants';

const { width } = Dimensions.get('window');
const CELL_WIDTH = (width - 130) / 3; // El ancho de la celda se ajusta restando 40 píxeles (10 píxeles de espacio a cada lado de la celda) y dividiendo por 3
const CELL_HEIGHT = CELL_WIDTH;

const SecondScreen = () => {
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

export default SecondScreen;
