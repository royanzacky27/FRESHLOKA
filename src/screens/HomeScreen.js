import React from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Pastikan Anda menginstal expo vector icons

const categories = [
  { id: "1", name: "Sayuran", image: require("../assets/sayuran.png") }, // Ganti dengan path gambar
  { id: "2", name: "Buah", image: require("../assets/buah.png") }, // Ganti dengan path gambar
  { id: "3", name: "Bumbu dapur", image: require("../assets/bumbu.png") }, // Ganti dengan path gambar
  { id: "4", name: "Protein", image: require("../assets/protein.png") }, // Ganti dengan path gambar
];

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Belanja apa hari ini?</Text>
        <View style={styles.iconContainer}>
          <Ionicons name="search" size={24} color="black" style={styles.icon} />
          <Ionicons name="cart" size={24} color="black" style={styles.icon} />
        </View>
      </View>
      <Image
        source={require("../assets/banner.png")} // Ganti dengan path gambar banner
        style={styles.banner}
      />
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
        showsHorizontalScrollIndicator={false} // Menyembunyikan scrollbar horizontal
      />
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
    paddingTop: 40, // Menambahkan padding atas
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
    padding: 10, // Menambahkan padding pada ikon
  },
  banner: {
    width: "1s0%",
    height: 250,
    borderRadius: 10,
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  categoryList: {
    justifyContent: "center", // Rata tengah
  },
  categoryCard: {
    alignItems: "center",
    marginHorizontal: 10, // Menambahkan margin horizontal untuk spasi
  },
  categoryImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  categoryName: {
    marginTop: 5,
    textAlign: "center",
  },
});

export default HomeScreen;
