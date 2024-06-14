import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuth, AuthProvider } from './AuthContext';
import { NavigationContainer } from '@react-navigation/native';

// Pantallas
import Signin2 from "./Signin2";
import Signup from "./Signup";
import WelcomeScreen from './WelcomeScreen';
import FoodListScreen from './FoodListScreen';
import AddFoodScreen from './AddFoodScreen';
import ManualEntryScreen from './ManualEntryScreen';
import BarcodeScannerScreen from './BarcodeScannerScreen';
import ProductScreen from './ProductScreen'
import RecetasScreen from './RecetasScreen';
import CreateRecipe from './CreateRecipe';
import RecipeScreen from './RecipeScreen';
import ScannedScreen from './ScannedScreen';

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
      <Stack.Screen name="ManualEntryScreen" 
      component={ManualEntryScreen} 
      options={{
        headerShown: true,
        title: "Ingresar Manualmente"
      }}
      />
      <Stack.Screen name="BarcodeScannerScreen" 
      component={BarcodeScannerScreen}
      options={{
        headerShown: true,
        title: "Lector de codigo de barras"
      }}
      />
      <Stack.Screen name="ScannedScreen" 
      component={ScannedScreen}
      options={{
        headerShown: true,
        title: "Producto"
      }}
      />
    </Stack.Navigator>
  );
}

function AddProductScreen() {
  return (
    <Stack.Navigator
      initialRouteName='FoodListScreen'>
        <Stack.Screen name='FoodListScreen' component={FoodListScreen} options={{ headerShown: false }}/>
        <Stack.Screen name='ProductScreen' component={ProductScreen}
        options={{
          headerShown: true,
          title: "Producto"
        }}/>
    </Stack.Navigator>
  );
}
function AddRecipeScreen(){
  return (
    <Stack.Navigator
      initialRouteName='RecetasScreen'>
        <Stack.Screen name='RecetasScreen' component={RecetasScreen} options={{ headerShown: false }}/>
        <Stack.Screen name='CreateRecipe' component={CreateRecipe}
        options={{
          headerShown: true,
          title: "Crear Receta"
        }}/>
        <Stack.Screen name="RecipeScreen" component={RecipeScreen} 
        options={{
          headerShown: true,
          title: "Crear Receta"
        }}/>
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
        name="AddProductScreen" 
        component={AddProductScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <FontAwesome name="search" size={size} color={color} />
          ),
          headerShown: false,
          tabBarLabel: ""
        }}
      />
      <Tab.Screen 
        name="AddRecipeScreen" 
        component={AddRecipeScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="file-document-edit-outline" size={size} color={color} />
          ),
          headerShown: false,
          tabBarLabel: ""
        }}
      />
    </Tab.Navigator>
  );
}

function Navigation() {
  const { user } = useAuth();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SigninStack" component={SigninStack} />
        <Stack.Screen 
          name="MainStack" 
          component={MainStack} 
          options={({ route }) => {
            const routeName = route.state
              ? route.state.routes[route.state.index].name
              : 'WelcomeScreen';

            if (routeName === 'ManualEntryScreen' || routeName === 'BarcodeScannerScreen') {
              return { tabBarVisible: false };
            }

            return { tabBarVisible: true };
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
}