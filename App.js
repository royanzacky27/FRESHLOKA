import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthProvider } from "./src/contexts/AuthContext";
import { AssetsProvider } from "./src/contexts/AssetsContext";
import { CartProvider } from "./src/contexts/CartContext";
import LogoScreen from "./src/screens/LogoScreen";
import AuthScreen from "./src/screens/AuthScreen";
import ForgotPasswordScreen from "./src/screens/ForgotPasswordScreen";
import ForgotPasswordScreen2 from "./src/screens/ForgotPasswordScreen2";
import RegisterScreen1 from "./src/screens/RegisterScreen1";
import RegisterScreen2 from "./src/screens/RegisterScreen2";
import HomeScreen from "./src/screens/HomeScreen";
import ProductDetailScreen from "./src/screens/ProductDetailScreen";
import SearchScreen from "./src/screens/SearchScreen";
import CartScreen from "./src/screens/CartScreen";
import CheckoutScreen from "./src/screens/CheckoutScreen";
import PaymentScreen from "./src/screens/PaymentScreen";
import CategoryScreen from "./src/screens/CategoryScreen";
import ProfileScreen from "./src/screens/ProfileScreen";

const Stack = createStackNavigator();

const App = () => {
  return (
    <AuthProvider>
      <AssetsProvider>
        <CartProvider>
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
                name="ForgotPasswordScreen"
                component={ForgotPasswordScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="ForgotPasswordScreen2"
                component={ForgotPasswordScreen2}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="CategoryScreen"
                component={CategoryScreen}
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
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Search"
                component={SearchScreen}
                options={{ headerShown: true, title: "Katalog" }}
              />
              <Stack.Screen
                name="CartScreen"
                component={CartScreen}
                options={{ headerShown: false, title: "Keranjang" }}
              />
              <Stack.Screen
                name="CheckoutScreen"
                component={CheckoutScreen}
                options={{ headerShown: false, title: "Keranjang" }}
              />
              <Stack.Screen
                name="PaymentScreen"
                component={PaymentScreen}
                options={{ headerShown: false, title: "Keranjang" }}
              />
              <Stack.Screen
                name="Profile"
                component={ProfileScreen}
                options={{ headerShown: true, title: "Profil" }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </CartProvider>
      </AssetsProvider>
    </AuthProvider>
  );
};

export default App;
