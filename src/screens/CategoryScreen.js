import { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import { CART_URL, PRODUCTS_URL } from "../config/constants";
import { useAssets } from "../contexts/AssetsContext";

const CategoryScreen = ({ route, navigation }) => {
  const { category } = route.params;
  const { assets } = useAssets();
  const { isAuthenticated, token } = useAuth();

  const [productDataByCategory, setProductDataByCategory] = useState(null);
  const [cartData, setCartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigation.replace("Auth");
    }
    fetchProductDataByCategory();
    fetchCartData();
  }, [isAuthenticated, navigation]);

  const fetchCartData = async () => {
    try {
      const response = await axios.get(CART_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = response.data;
      if (response.status === 200) {
        setCartData(result.data);
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchProductDataByCategory = async () => {
    try {
      const response = await axios.get(
        `${PRODUCTS_URL}?category=${category._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = response.data;
      if (response.status === 200) {
        setProductDataByCategory(result.data);
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2E7D32" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Belanja apa hari ini?</Text>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <Ionicons name="search" size={24} color="grey" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("Cart", cartData)}
          >
            <Ionicons name="cart" size={24} color="grey" />
            {cartData.length > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cartData.length}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <Image source={assets[category["imageUrl"]]} style={styles.banner} />

      <Text style={styles.subTitle}>
        <Text style={styles.categoryLabel}>Category: </Text>
        <Text style={styles.categoryValue}>{category["name"]}</Text>
      </Text>

      <FlatList
        data={productDataByCategory}
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ProductDetail", { product: item })
              }
            >
              <Image
                source={assets[item.imageUrl]}
                style={styles.productImage}
              />
              <Text style={styles.productName}>{item.name}</Text>
              <View style={styles.productInfoRow}>
                <Text style={styles.productPrice}>Rp {item.price}</Text>
                <Text style={styles.productStock}>{item.stock} pcs</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item._id}
        numColumns={2}
        contentContainerStyle={styles.productList}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Belum ada data</Text>
          </View>
        )}
      />

      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

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
          <Ionicons name="search" size={24} color="white" />
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
    padding: 18,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 40,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  cartBadge: {
    backgroundColor: "red",
    position: "absolute",
    right: -10,
    top: -5,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  cartBadgeText: {
    color: "white",
    fontSize: 10,
  },
  banner: {
    width: "100%",
    height: 100,
    borderRadius: 10,
    overflow: "hidden",
    resizeMode: "cover",
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  categoryLabel: {
    fontWeight: "bold",
    color: "grey",
  },
  categoryValue: {
    fontWeight: "normal",
    color: "#2E7D32",
  },
  categoryList: {
    width: "100%",
    height: 150,
    justifyContent: "space-between",
    alignContent: "center",
    marginBottom: 10,
  },
  categoryCard: {
    alignItems: "center",
  },
  categoryImage: {
    width: 60,
    height: 60,
    borderRadius: 50,
    overflow: "hidden",
    resizeMode: "cover",
  },
  categoryName: {
    marginVertical: 10,
    textAlign: "center",
  },
  productList: {
    width: "100%",
    justifyContent: "space-between",
    alignContent: "center",
    marginBottom: 10,
    gap: 10,
  },
  productCard: {
    width: "50%",
    alignItems: "center",
  },
  productImage: {
    width: 160,
    height: 120,
    borderRadius: 10,
    overflow: "hidden",
    resizeMode: "cover",
  },
  productName: {
    marginTop: 6,
    fontWeight: "bold",
  },
  productInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2E7D32",
  },
  productStock: {
    fontSize: 16,
    color: "#888",
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#555",
  },
  backButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#dfdfdf",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignSelf: "center",
  },
  backButtonText: {
    color: "#2E7D32",
    fontSize: 12,
  },
  emptyContainer: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: "#777",
  },
});

export default CategoryScreen;
