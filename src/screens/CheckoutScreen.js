import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { useAuth } from "../contexts/AuthContext";
import { useAssets } from "../contexts/AssetsContext";
import { CART_URL } from "../config/constants";
import axios from "axios";

const CheckoutScreeen = ({ route, navigation }) => {
  const { deliveryTime, deliveryFee, totalPrice, totalAmount } = route.params;
  const { isAuthenticated, token, authMe } = useAuth();
  const { assets } = useAssets();
  const [userData, setUserData] = useState(null);
  const [cartData, setCartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [adminFee, setAdminFee] = useState(1500);

  useEffect(() => {
    if (!isAuthenticated) {
      navigation.replace("Auth");
      return;
    }
    fetchCartData();
    fetchUserData();
    // setTotalAll(total + adminFee);
    console.log(userData, userData);
  }, [isAuthenticated, token, authMe, navigation]);

  const fetchUserData = async () => {
    const response = await authMe(token);
    const result = response.data;
    if (result && result.data) {
      setUserData(result.data);
    } else {
      setError("Failed to fetchUserData: No items found in response");
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

  const handleCheckout = () => {
    navigation.navigate("PaymentScreen", { total: totalAmount });
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
        <Text style={styles.title}>Checkout</Text>
      </View>

      <Text style={styles.label}>Delivery address</Text>
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={userData.address}
        editable={false}
      />

      <Text style={styles.label}>Delivery time</Text>
      <TextInput
        style={styles.input}
        placeholder="Delivery Time"
        value={`${deliveryTime} minutes`}
        editable={false}
      />

      <Text style={styles.label}>Delivery Fee</Text>
      <TextInput
        style={styles.input}
        placeholder="Delivery Fee"
        value={`Rp ${deliveryFee.toLocaleString()}`}
        editable={false}
      />

      <Text style={styles.label}>Total Amount</Text>
      <TextInput
        style={styles.input}
        placeholder="Total Amount"
        value={`Rp ${totalAmount.toLocaleString()}`}
        editable={false}
      />

      <TouchableOpacity style={styles.button} onPress={handleCheckout}>
        <Text style={styles.buttonText}>Confirm Order</Text>
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
  label: {
    paddingVertical: 10,
    color: "grey",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: "#f9f9f9",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#2E7D32",
    borderRadius: 5,
    padding: 15,
    alignItems: "center",
  },
  buttonText: {
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
});

export default CheckoutScreeen;
