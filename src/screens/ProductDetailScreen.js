import { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useAssets } from "../contexts/AssetsContext";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";

const ProductDetailScreen = ({ route, navigation }) => {
  const { product } = route.params;
  const { isAuthenticated, token } = useAuth();
  const { assets } = useAssets();
  const [isLoading, setIsLoading] = useState(false);
  const { createItemToCart } = useCart();

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!isAuthenticated) {
      navigation.replace("Auth");
      return;
    }
  }, [isAuthenticated, navigation]);

  const handleAddToCart = async () => {
    await createItemToCart({ id: product._id, quantity }, token);
    Alert.alert(
      "Cart Updated",
      "The item has been successfully added to your cart.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Check Carts",
          onPress: () => {
            navigation.navigate("CartScreen");
          },
        },
      ],
      { cancelable: true }
    );
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
        <Text style={styles.title}>{product.name}</Text>
      </View>

      <Image
        source={assets[product.imageUrl]}
        style={styles.productImage}
        resizeMode="cover"
      />

      <View style={styles.productInfoRow}>
        <Text style={styles.productInfoValue}>
          {`Rp ${product.price.toLocaleString()}/pcs`}
        </Text>
        <Text style={styles.productInfoLabel}>{`${product.stock} pcs`}</Text>
      </View>

      <View style={styles.productInfoRow2}>
        <Text>{product.description}</Text>
      </View>

      <View style={styles.cartInfoRow}>
        <Text style={styles.cartInfoLabel}>Ammount Total </Text>
        <Text style={styles.cartInfoValue}>
          {`Rp ${(product.price * quantity).toLocaleString()}`}
        </Text>
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
    fontSize: 16,
    fontWeight: "bold",
    color: "#2E7D32",
  },
  productInfoLabel: {
    fontSize: 16,
    color: "grey",
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

export default ProductDetailScreen;
