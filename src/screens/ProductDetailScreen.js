import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ProductDetailScreen = ({ route, navigation, addToCart }) => {
  const { product } = route.params; // Mendapatkan data product dari route.params
  const [quantity, setQuantity] = useState(1);

  // Validasi data product
  if (!product || !product.name || !product.price || !product.image) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Product details are missing!</Text>
      </View>
    );
  }

  const handleAddToCart = () => {
    if (typeof addToCart === "function") {
      addToCart({ ...product, quantity }); // Menambahkan produk ke cart
      Alert.alert("Success", "Product added to cart!");
      navigation.goBack(); // Kembali ke halaman sebelumnya
    } else {
      console.error("addToCart is not a function or is undefined!");
      Alert.alert("Error", "Failed to add product to cart!");
    }
  };

  return (
    <View style={styles.container}>
      {/* Tombol Back */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      {/* Nama Produk */}
      <Text style={styles.title}>{product.name}</Text>

      {/* Gambar Produk */}
      <Image
        source={
          typeof product.image === "number"
            ? product.image // Jika menggunakan require('./image.png')
            : { uri: product.image } // Jika menggunakan URI
        }
        style={styles.productImage}
        resizeMode="contain"
      />

      {/* Harga */}
      <Text style={styles.price}>Rp. {product.price.toLocaleString()}</Text>

      {/* Kontrol Kuantitas */}
      <View style={styles.quantityContainer}>
        <TouchableOpacity
          onPress={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
          style={styles.quantityButton}
        >
          <Text style={styles.quantityButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>{quantity}</Text>
        <TouchableOpacity
          onPress={() => setQuantity(quantity + 1)}
          style={styles.quantityButton}
        >
          <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Tombol Add to Cart */}
      <TouchableOpacity style={styles.checkoutButton} onPress={handleAddToCart}>
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
    textAlign: "center",
  },
  productImage: {
    width: "100%",
    height: 250,
    borderRadius: 10,
    marginBottom: 10,
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2E7D32",
    textAlign: "center",
    marginBottom: 20,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  quantityButton: {
    padding: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
    marginHorizontal: 10,
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  quantityText: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 10,
  },
  checkoutButton: {
    backgroundColor: "#2E7D32",
    borderRadius: 5,
    padding: 15,
    alignItems: "center",
    marginTop: 20,
  },
  checkoutButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    marginTop: 50,
  },
});

export default ProductDetailScreen;
