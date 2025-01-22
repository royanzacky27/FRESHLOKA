import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { REGISTER_URL } from "../config/constants";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

const RegisterScreen2 = ({ route, navigation }) => {
  const { login } = useAuth();

  const { name, email, password, confirmPassword } = route.params;
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const register = async (data) => {
    const response = await axios.post(REGISTER_URL, data);
    const result = response.data;
    if (response.status === 200) {
      return result;
    }
    return null;
  };

  const handleCreate = async () => {
    const result = await register({
      name,
      email,
      password,
      confirmPassword,
      address,
      phoneNumber,
      gender,
    });
    if (result) {
      Alert.alert("Register", "Successfully!");
      const loggin = await login(email, password);
      if (loggin) {
        Alert.alert("Login", result.message || "Invalid email or password!");
        navigation.replace("Home");
      }
    } else {
      Alert.alert("Register", "Failed!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Freshloka</Text>
      <Text style={styles.welcomeText}>We're glad to have you with us</Text>
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />

      <View style={styles.radioGroupContainer}>
        <TouchableOpacity
          style={styles.radioButtonContainer}
          onPress={() => setGender("MALE")}
        >
          <View
            style={[styles.radioCircle, gender === "MALE" && styles.selected]}
          />
          <Text style={styles.radioText}>Male</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.radioButtonContainer}
          onPress={() => setGender("FEMALE")}
        >
          <View
            style={[styles.radioCircle, gender === "FEMALE" && styles.selected]}
          />
          <Text style={styles.radioText}>Female</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />

      <TouchableOpacity style={styles.createButton} onPress={handleCreate}>
        <Text style={styles.buttonText}>Create</Text>
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
    backgroundColor: "#fff",
    padding: 20,
    justifyContent: "center",
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
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2E7D32",
    textAlign: "center",
    marginBottom: 20,
  },
  welcomeText: {
    textAlign: "center",
    fontSize: 16,
    marginBottom: 20,
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
  createButton: {
    backgroundColor: "#2E7D32",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  radioGroupContainer: {
    height: 50,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 15,
  },
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "20%",
  },
  radioCircle: {
    height: 14,
    width: 14,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
    marginEnd: 4, // Memberikan ruang antara lingkaran dan teks
  },
  selected: {
    backgroundColor: "#2E7D32",
    borderColor: "#2E7D32",
  },
  radioText: {
    fontSize: 16,
    color: "#000",
  },
});

export default RegisterScreen2;
