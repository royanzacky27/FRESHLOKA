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
import { CART_URL } from "../config/constants";
import axios from "axios";
import ExpandableItem from "./ExpandableItem";

const PaymentScreen = ({ navigation }) => {
  const { isAuthenticated, token } = useAuth();
  const { assets } = useAssets();
  const [cartData, setCartData] = useState([]);
  const [bankData, setBankData] = useState([
    {
      id: 1,
      title: "Bank BCA (Mobile Banking)",
      options: ["Kode Bank: 121", "Rekening Tujuan: 0022378946246289"],
    },
    {
      id: 2,
      title: "Bank Mandiri (Mobile Banking)",
      options: ["Kode Bank: 122", "Rekening Tujuan: 0022378946246289"],
    },
    {
      id: 3,
      title: "Bank BRI (Mobile Banking)",
      options: ["Kode Bank: 123", "Rekening Tujuan: 0022378946246289"],
    },
  ]);
  const [cartDataItems, setcartDataItems] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigation.replace("Auth");
    }
    fetchCartData();

    cartData.forEach((obj) => {
      const items = obj.items;
      items.forEach((item) => {
        console.log(item.product["_id"], "product items");
        console.log(item.quantity, "product items");
      });
    });
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

  const [cartItems, setCartItems] = useState([
    {
      id: "1",
      name: "Pisang Barangan",
      price: 96000,
      quantity: 2,
      image: require("../assets/pisang.png"),
    },
  ]);

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const removeItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleConfirmPayment = () => {
    navigation.navigate("");
  };

  const increaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
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
        <Text style={styles.title}>Payment</Text>
      </View>

      <Text style={styles.subtitle}>Invoice</Text>
      <View style={styles.invoiceDetailRow}>
        <Text style={styles.invoiceDetaiLabel}>Label: </Text>
        <Text style={styles.invoiceDetaiValue}>Value</Text>
      </View>

      <Text style={styles.subtitle}>Pilih Cara Pembayaran</Text>
      {bankData.map((bank, index) => (
        <ExpandableItem key={index} title={bank.title} options={bank.options} />
      ))}

      <TouchableOpacity style={styles.button} onPress={handleConfirmPayment}>
        <Text style={styles.buttonText}>Confirm Payment</Text>
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
  subtitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 14,
  },
  invoiceDetailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  invoiceDetaiLabel: {
    fontSize: 16,
  },
  invoiceDetaiValue: {
    fontSize: 16,
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
});

export default PaymentScreen;
