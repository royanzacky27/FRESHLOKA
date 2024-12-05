import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";

const products = [
  {
    id: "1",
    name: "Retinol Youth Renewal Night Cream",
    price: "$84.00",
    image: require("../assets/product1.png"), // Ganti dengan path gambar produk
  },
  {
    id: "2",
    name: "Glycolic Acid 7% Toning Solution",
    price: "$14.50",
    image: require("../assets/product2.png"), // Ganti dengan path gambar produk
  },
  {
    id: "3",
    name: "Solar Power",
    price: "$96.00",
    image: require("../assets/product3.png"), // Ganti dengan path gambar produk
  },
  {
    id: "4",
    name: "Natural Moisturizing Factors + HA",
    price: "$6.50",
    image: require("../assets/product4.png"), // Ganti dengan path gambar produk
  },
];

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome back, Sofia</Text>
      </View>
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.productCard}>
            <Image source={item.image} style={styles.productImage} />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>{item.price}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.productList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  productList: {
    padding: 10,
  },
  productCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  productImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  productPrice: {
    fontSize: 14,
    color: "#888",
  },
});

export default HomeScreen;
