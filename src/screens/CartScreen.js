import { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { useAuth } from "../contexts/AuthContext";
import { useAssets } from "../contexts/AssetsContext";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useCart } from "../contexts/CartContext";

const CartScreen = ({ navigation }) => {
  const { isAuthenticated, token } = useAuth();
  const { assets } = useAssets();
  const { productsInCart, fetchCartData, totalAmount } = useCart();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigation.replace("Auth");
      return;
    }
    fetchCartData(token);
    if (productsInCart) {
      setIsLoading(false);
    }
  }, [isAuthenticated, token, navigation]);

  const handleRemoveItem = (id) => {
    console.log(id, "remove");
  };

  const handleCheckout = () => {
    navigation.navigate("CheckoutScreen", { total: totalAmount });
  };

  const increaseQuantity = (id) => {
    console.log(id);
    // setCartItems((prevItems) =>
    //   prevItems.map((item) =>
    //     item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    //   )
    // );
  };

  const decreaseQuantity = (id) => {
    console.log(id);
    // setCartItems((prevItems) =>
    //   prevItems.map((item) =>
    //     item.id === id && item.quantity > 1
    //       ? { ...item, quantity: item.quantity - 1 }
    //       : item
    //   )
    // );
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
        <Text style={styles.title}>Carts</Text>
      </View>

      <FlatList
        data={productsInCart}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Image source={assets[item.imageUrl]} style={styles.productImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productPrice}>
                {`Rp ${item.price.toLocaleString()}/pcs`}
              </Text>
              <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={() => decreaseQuantity(item._id)}>
                  <AntDesign name="minuscircleo" size={16} color="black" />
                </TouchableOpacity>
                <Text style={styles.productQuantity}>{item.quantity}</Text>
                <TouchableOpacity onPress={() => increaseQuantity(item._id)}>
                  <AntDesign name="pluscircleo" size={16} color="black" />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity onPress={() => handleRemoveItem(item._id)}>
              <AntDesign name="delete" size={16} color="red" />
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item._id}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Empty</Text>
          </View>
        )}
      />

      <Text style={styles.totalText}>
        Total: Rp {totalAmount.toLocaleString()}
      </Text>

      <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
        <Text style={styles.checkoutButtonText}>Checkout</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.button2}
      >
        <Text style={styles.button2Text}>Back</Text>
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
    paddingTop: 50,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  emptyCartText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 50,
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
    fontSize: 16,
    fontWeight: "bold",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 12,
    gap: 4,
  },
  quantityButton: {
    backgroundColor: "#2E7D32",
    color: "#fff",
    padding: 5,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  removeButton: {
    color: "red",
    marginLeft: 10,
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
    textAlign: "center",
    color: "#2E7D32",
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
  button2: {
    margin: 16,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  button2Text: {
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

export default CartScreen;
