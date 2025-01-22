import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LogoScreen from "./src/screens/LogoScreen";
import AuthScreen from "./src/screens/AuthScreen";
import RegisterScreen1 from "./src/screens/RegisterScreen1";
import RegisterScreen2 from "./src/screens/RegisterScreen2";
import HomeScreen from "./src/screens/HomeScreen";
import ProductDetailScreen from "./src/screens/ProductDetailScreen";
import SearchScreen from "./src/screens/SearchScreen";
import CartScreen from "./src/screens/CartScreen";
import ProfileScreen from "./src/screens/ProfileScreen"; // Pastikan ini ada
import { AuthProvider } from "./src/contexts/AuthContext";

const Stack = createStackNavigator();

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Logo">
          <Stack.Screen
            name="Logo"
            component={LogoScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Auth"
            component={AuthScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RegisterScreen1"
            component={RegisterScreen1}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RegisterScreen2"
            component={RegisterScreen2}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ProductDetail"
            component={ProductDetailScreen}
            options={{ headerShown: true }}
          />
          <Stack.Screen
            name="Search"
            component={SearchScreen}
            options={{ headerShown: true, title: "Katalog" }}
          />
          <Stack.Screen
            name="Cart"
            component={CartScreen}
            options={{ headerShown: true, title: "Keranjang" }}
          />
          <Stack.Screen
            name="Profile"
            component={ProfileScreen} // Tambahkan ini
            options={{ headerShown: true, title: "Profil" }} // Tampilkan header
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
