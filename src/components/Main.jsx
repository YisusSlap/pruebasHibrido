import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
// pantallas
import Signin from "./Signin.jsx";
import Signin2 from "./Signin2.jsx";
import Signup from "./Signup.jsx";
import WelcomeScreen from './WelcomeScreen.jsx';
import FoodListScreen from './FoodListScreen.jsx';

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
      initialRouteName='Signin'>
      <Tab.Screen 
      name="WelcomScreen" 
      component={WelcomeScreen}
      
      />
      <Tab.Screen name="FoodListScreen" component={FoodListScreen}/>
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
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}