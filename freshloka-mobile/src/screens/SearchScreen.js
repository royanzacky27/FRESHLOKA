import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";

// Daftar produk
const products = [
  {
    id: "1",
    name: "Apel Fuji",
    price: "Rp. 52.000/kg",
    image: require("../assets/apel_fiji.png"),
  },
  {
    id: "2",
    name: "Jeruk",
    price: "Rp. 30.000/kg",
    image: require("../assets/jeruk.png"),
  },
  {
    id: "3",
    name: "Kiwi",
    price: "Rp. 60.000/kg",
    image: require("../assets/kiwi.png"),
  },
  {
    id: "4",
    name: "Anggur",
    price: "Rp. 45.000/kg",
    image: require("../assets/anggur.png"),
  },
  {
    id: "5",
    name: "Mangga",
    price: "Rp. 38.000/kg",
    image: require("../assets/mangga.png"),
  },
  {
    id: "6",
    name: "Semangka",
    price: "Rp. 20.000/kg",
    image: require("../assets/semangka.png"),
  },
];

// Komponen utama SearchScreen
const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState(""); // State untuk query pencarian

  // Filter produk berdasarkan query pencarian
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Input Pencarian */}
      <TextInput
        style={styles.searchInput}
        placeholder="Cari produk..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Daftar Produk */}
      {filteredProducts.length > 0 ? (
        <FlatList
          data={filteredProducts}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.productCard}
              onPress={() =>
                navigation.navigate("ProductDetail", { product: item })
              }
            >
              <Image source={item.image} style={styles.productImage} />
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productPrice}>{item.price}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id} // Gunakan ID sebagai key
          contentContainerStyle={styles.productList}
        />
      ) : (
        // Pesan jika tidak ada produk ditemukan
        <Text style={styles.noProductText}>Produk tidak ditemukan.</Text>
      )}
    </View>
  );
};

// Gaya untuk komponen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  searchInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  productCard: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  productName: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  productPrice: {
    marginTop: 5,
    fontSize: 14,
    color: "#2E7D32",
  },
  productList: {
    paddingBottom: 20,
  },
  noProductText: {
    textAlign: "center",
    fontSize: 16,
    color: "#888",
    marginTop: 20,
  },
});

export default SearchScreen;
