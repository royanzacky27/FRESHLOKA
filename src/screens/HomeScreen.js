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
import { CART_URL, CATEGORY_URL, PRODUCTS_URL } from "../config/constants";
import { useAssets } from "../contexts/AssetsContext";

const HomeScreen = ({ navigation }) => {
  const { isAuthenticated, token } = useAuth();
  const { assets } = useAssets();

  const [categoriesData, setCategoriesData] = useState(null);
  const [productData, setProductData] = useState(null);
  const [cartData, setCartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigation.replace("Auth");
    }
    fetchCategoryData();
    fetchProductData();
    fetchCartData();
  }, [isAuthenticated, navigation]);

  const fetchCategoryData = async () => {
    try {
      const response = await axios.get(CATEGORY_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = response.data;
      if (response.status === 200) {
        setCategoriesData(result.data);
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

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

  const fetchProductData = async () => {
    try {
      const response = await axios.get(PRODUCTS_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = response.data;
      if (response.status === 200) {
        setProductData(result.data);
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
            onPress={() => navigation.navigate("CartScreen", cartData)}
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

      <Image source={require("../assets/banner.png")} style={styles.banner} />

      <Text style={styles.subTitle}>Category</Text>

      <FlatList
        data={categoriesData}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.categoryCard}
            onPress={() =>
              navigation.navigate("CategoryScreen", { category: item })
            }
          >
            <Image
              source={assets[item.imageUrl]}
              style={styles.categoryImage}
            />
            <Text style={styles.categoryName}>{item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item._id}
        horizontal
        contentContainerStyle={styles.categoryList}
        showsHorizontalScrollIndicator={false}
      />

      <Text style={styles.subTitle}>Products</Text>

      <FlatList
        data={productData}
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
        showsVerticalScrollIndicator={false}
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
          <Ionicons name="search" size={24} color="white" />
          <Text style={styles.navButtonText}>Search</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate("CartScreen")}
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
    height: 250,
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
  categoryList: {
    width: "100%",
    justifyContent: "space-between",
    alignContent: "center",
    marginBottom: 40,
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
});

export default HomeScreen;
