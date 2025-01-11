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
  // Tambahkan produk lainnya sesuai kebutuhan
];

const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Cari produk..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
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
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.productList}
      />
    </View>
  );
};

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
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  productName: {
    marginTop: 5,
    fontWeight: "bold",
  },
  productPrice: {
    marginTop: 5,
    color: "#2E7D32",
  },
});

export default SearchScreen;
