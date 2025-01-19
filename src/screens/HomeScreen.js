import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const categories = [
  { id: "1", name: "Sayuran", image: require("../assets/sayuran.png") },
  { id: "2", name: "Buah", image: require("../assets/buah.png") },
  { id: "3", name: "Bumbu dapur", image: require("../assets/bumbu.png") },
  { id: "4", name: "Protein", image: require("../assets/protein.png") },
];

const products = [
  {
    id: "1",
    name: "Kiwi",
    price: "Rp. 15.000",
    image: require("../assets/kiwi.png"),
  },
  {
    id: "2",
    name: "Bawang Putih",
    price: "Rp. 8.000",
    image: require("../assets/bawang_putih.png"),
  },
  {
    id: "3",
    name: "Kol",
    price: "Rp. 8.000",
    image: require("../assets/kol.png"),
  },
  {
    id: "4",
    name: "Paket Sayur Hijau",
    price: "Rp. 37.000",
    image: require("../assets/paket_sayur_hijau.png"),
  },
];

const HomeScreen = ({ navigation }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (cartItem) => cartItem.id === item.id
      );
      if (existingItem) {
        return prevItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Belanja apa hari ini?</Text>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <Ionicons
              name="search"
              size={24}
              color="black"
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
            <View style={styles.cartIconContainer}>
              <Ionicons
                name="cart"
                size={24}
                color="black"
                style={styles.icon}
              />
              {cartItems.length > 0 && (
                <View style={styles.cartBadge}>
                  <Text style={styles.cartBadgeText}>{cartItems.length}</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <Image source={require("../assets/banner.png")} style={styles.banner} />
      <Text style={styles.categoryTitle}>Category</Text>
      <FlatList
        data={categories}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.categoryCard}>
            <Image source={item.image} style={styles.categoryImage} />
            <Text style={styles.categoryName}>{item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        horizontal
        contentContainerStyle={styles.categoryList}
        showsHorizontalScrollIndicator={false}
      />
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ProductDetail", { product: item })
              }
            >
              <Image source={item.image} style={styles.productImage} />
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productPrice}>{item.price}</Text>
            </TouchableOpacity>
            {/* Hapus tombol "+" di sini */}
          </View>
        )}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.productList}
      />
      <View style={styles.navigationContainer}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate("Home")}
        >
          <Ionicons name="home" size={24} color="white" />
          <Text style={styles.navButtonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate("Search")}
        >
          <Ionicons name="search" size={24} color="black" />
          <Text style={styles.navButtonText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate("Cart")}
        >
          <Ionicons name="cart" size={24} color="white" />
          <Text style={styles.navButtonText}>Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate("Profile")}
        >
          <Ionicons name="person" size={24} color="white" />
          <Text style={styles.navButtonText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    paddingTop: 40,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  iconContainer: {
    flexDirection: "row",
  },
  icon: {
    marginLeft: 15,
    padding: 2,
  },
  cartIconContainer: {
    position: "relative",
  },
  cartBadge: {
    position: "absolute",
    right: -10,
    top: -5,
    backgroundColor: "red",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  cartBadgeText: {
    color: "white",
    fontSize: 12,
  },
  banner: {
    width: "100%",
    height: 250,
    borderRadius: 10,
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 0,
  },
  categoryList: {
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
    paddingBottom: 10,
  },
  categoryCard: {
    alignItems: "center",
    marginHorizontal: 5,
    paddingBottom: 20,
  },
  categoryImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    overflow: "hidden",
  },
  categoryName: {
    marginTop: 5,
    textAlign: "center",
  },
  productList: {
    justifyContent: "space-between",
  },
  productCard: {
    flex: 1,
    margin: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    position: "relative",
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  productName: {
    marginTop: 10,
    fontWeight: "bold",
  },
  productPrice: {
    marginTop: 5,
    color: "#2E7D32",
  },
  navigationContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#2E7D32",
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 20,
  },
  navButton: {
    alignItems: "center",
  },
  navButtonText: {
    color: "white",
    fontSize: 12,
  },
});

export default HomeScreen;
