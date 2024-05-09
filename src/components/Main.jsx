import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

// Pantallas
import Signin2 from "./Signin2.jsx";
import Signup from "./Signup.jsx";
import WelcomeScreen from './WelcomeScreen.jsx';
import FoodListScreen from './FoodListScreen.jsx';
import AddFoodScreen from './AddFoodScreen.jsx';
import ManualEntryScreen from './ManualEntryScreen.jsx';
import BarcodeScannerScreen from './BarcodeScannerScreen.jsx';

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

function MainStack() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#800000'
      }}>
      <Tab.Screen 
        name="WelcomScreen" 
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
        name="AddFoodScreen" 
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