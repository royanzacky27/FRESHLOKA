import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useAssets } from "../contexts/AssetsContext";

const ProductDetailScreen = ({ route, navigation, addToCart }) => {
  const { product } = route.params;
  const { assets } = useAssets();

  const [quantity, setQuantity] = useState(1);

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
      <View style={styles.header}>
        <Text style={styles.title}>{product.name}</Text>
      </View>

      <Image
        source={assets[product.imageUrl]}
        style={styles.productImage}
        resizeMode="cover"
      />

      <View style={styles.productInfoRow}>
        <View style={styles.productInfoRow}>
          <Text style={styles.productInfoValue}>Rp {product.price} </Text>
          <Text style={styles.productInfoLabel}>/ pcs</Text>
        </View>

        <View style={styles.productInfoRow}>
          <Text style={styles.productInfoLabel}>Stocks: </Text>
          <Text style={styles.productInfoValue}>{product.stock} pcs</Text>
        </View>
      </View>

      <View style={styles.productInfoRow2}>
        <Text>{product.description}</Text>
      </View>

      <View style={styles.cartInfoRow}>
        <Text style={styles.cartInfoLabel}>Total bayar: </Text>
        <Text style={styles.cartInfoValue}>Rp {product.price * quantity}</Text>
      </View>

      <View style={styles.quantityContainer}>
        <TouchableOpacity
          onPress={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
        >
          <AntDesign name="minuscircleo" size={24} color="black" />
        </TouchableOpacity>

        <Text style={styles.quantityText}>{quantity}</Text>

        <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
          <AntDesign name="pluscircleo" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.checkoutButton} onPress={handleAddToCart}>
        <Text style={styles.checkoutButtonText}>Add to Cart</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Text style={styles.backButtonText}>Back</Text>
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
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 70,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  productImage: {
    width: "100%",
    height: 300,
    borderRadius: 10,
    marginVertical: 12,
  },
  productInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  productInfoRow2: {
    marginTop: 18,
    marginBottom: 12,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  productInfoValue: {
    fontWeight: "bold",
    color: "#2E7D32",
    fontSize: 16,
  },
  productInfoLabel: {
    color: "grey",
    fontSize: 16,
  },
  cartInfoRow: {
    fontWeight: "bold",
    marginVertical: 12,
  },
  cartInfoLabel: {
    fontSize: 18,
    fontWeight: "normal",
    color: "grey",
    textAlign: "center",
    marginBottom: 10,
  },
  cartInfoValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2E7D32",
    textAlign: "center",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 12,
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
  backButton: {
    margin: 16,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  backButtonText: {
    color: "#2E7D32",
    fontSize: 16,
  },
});

export default ProductDetailScreen;
