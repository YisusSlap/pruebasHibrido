import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

// Pantallas
import Signin2 from "./Signin2";
import Signup from "./Signup";
import WelcomeScreen from './WelcomeScreen';
import FoodListScreen from './FoodListScreen';
import AddFoodScreen from './AddFoodScreen';
import ManualEntryScreen from './ManualEntryScreen';
import BarcodeScannerScreen from './BarcodeScannerScreen';

// Iconos
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function SigninStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Signin" component={Signin2} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
}

function AddFoodStack() {
  return (
    <Stack.Navigator
      initialRouteName="AddFoodScreen">
      <Stack.Screen name="AddFoodScreen" component={AddFoodScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ManualEntryScreen" component={ManualEntryScreen} />
      <Stack.Screen name="BarcodeScannerScreen" component={BarcodeScannerScreen} />
    </Stack.Navigator>
  );
}

function MainStack() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#800000'
      }}>
      <Tab.Screen 
        name="WelcomeScreen" 
        component={WelcomeScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="fridge" size={size} color={color} />
          ),
          headerShown: false,
          tabBarLabel: ""
        }}
      />
      <Tab.Screen 
        name="AddFoodStack" 
        component={AddFoodStack}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="food-variant" size={size} color={color} />
          ),
          headerShown: false,
          tabBarLabel: ""
        }}
      />
      <Tab.Screen 
        name="FoodListScreen" 
        component={FoodListScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <FontAwesome name="search" size={size} color={color} />
          ),
          headerShown: false,
          tabBarLabel: ""
        }}
      />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SigninStack" component={SigninStack} />
        <Stack.Screen name="MainStack" component={MainStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}