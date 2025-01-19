import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ProductDetailScreen from "./ProductDetailScreen"; // Pastikan path ini benar

const Stack = createStackNavigator();

const ParentComponent = () => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: product.quantity }];
    });
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="ProductDetail"
          options={{ title: "Product Detail" }}
        >
          {(props) => <ProductDetailScreen {...props} addToCart={addToCart} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ParentComponent;
