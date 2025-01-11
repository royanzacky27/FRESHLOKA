import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";

const CartScreen = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: "1",
      name: "Pisang Barangan",
      price: 96000,
      quantity: 2,
      image: require("../assets/pisang.png"),
    },
    {
      id: "2",
      name: "Telur",
      price: 17500,
      quantity: 2,
      image: require("../assets/telur.png"),
    },
    {
      id: "3",
      name: "Sayur Kol",
      price: 18000,
      quantity: 2,
      image: require("../assets/kol.png"),
    },
  ]);

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Keranjang Belanja</Text>
      <Text style={styles.subtitle}>Pilih Waktu Pengiriman</Text>
      <FlatList
        data={cartItems}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Image source={item.image} style={styles.productImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productPrice}>
                Rp. {item.price.toLocaleString()}/kg
              </Text>
              <Text style={styles.productQuantity}>
                Jumlah: {item.quantity}
              </Text>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>
          Total Belanja: Rp. {totalAmount.toLocaleString()}
        </Text>
      </View>
      <TouchableOpacity style={styles.checkoutButton}>
        <Text style={styles.checkoutButtonText}>Checkout</Text>
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 10,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  productPrice: {
    color: "#2E7D32",
  },
  productQuantity: {
    marginTop: 5,
  },
  totalContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  checkoutButton: {
    marginTop: 20,
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

export default CartScreen;
