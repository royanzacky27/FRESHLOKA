import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ProductDetailScreen = ({ route, navigation }) => {
  const { product } = route.params; // Mengambil data produk dari parameter

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>{product.name}</Text>
      <Image source={product.image} style={styles.productImage} />
      <Text style={styles.price}>{product.price}</Text>
      <Text style={styles.expiry}>EXP date: {product.expiry}</Text>
      <Text style={styles.description}>{product.description}</Text>
      <View style={styles.quantityContainer}>
        <Text>01</Text>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.checkoutButton}>
        <Text style={styles.checkoutButtonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  backButton: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  productImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2E7D32",
  },
  expiry: {
    marginVertical: 10,
    color: "#888",
  },
  description: {
    marginVertical: 10,
    fontSize: 16,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  addButton: {
    backgroundColor: "#2E7D32",
    borderRadius: 5,
    padding: 10,
    marginLeft: 10,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  checkoutButton: {
    backgroundColor: "#2E7D32",
    borderRadius: 5,
    padding: 15,
    alignItems: "center",
  },
  checkoutButtonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default ProductDetailScreen;
