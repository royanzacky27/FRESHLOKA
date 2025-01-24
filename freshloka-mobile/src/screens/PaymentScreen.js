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

const PaymentScreen = ({ route, navigation }) => {
  const { total } = route.params;
  const { isAuthenticated, token } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    if (!isAuthenticated) {
      navigation.replace("Auth");
      return;
    }
    setIsLoading(false);
  }, [isAuthenticated, navigation]);

  const handleConfirmPayment = () => {
    navigation.navigate("Home");
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
        <Text style={styles.invoiceDetaiLabel}>Total: </Text>
        <Text style={styles.invoiceDetaiValue}>
          Rp {total.toLocaleString()}
        </Text>
      </View>

      <Text style={styles.subtitle}>Pilih Cara Pembayaran</Text>
      {bankData.map((bank, index) => (
        <ExpandableItem key={index} title={bank.title} options={bank.options} />
      ))}

      <TouchableOpacity style={styles.button} onPress={handleConfirmPayment}>
        <Text style={styles.buttonText}>Confirm Payment</Text>
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
    fontWeight: "bold",
    marginVertical: 20,
  },
  invoiceDetailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  invoiceDetaiLabel: {
    fontSize: 16,
    color: "grey",
  },
  invoiceDetaiValue: {
    fontSize: 16,
    color: "#2E7D32",
    fontWeight: "bold",
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

export default PaymentScreen;
