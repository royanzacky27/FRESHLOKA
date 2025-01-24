import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { FORGOT_PASSWORD_CHANGE_URL } from "../config/constants";
import axios from "axios";

const ForgotPasswordScreen2 = ({ route, navigation }) => {
  const { userId } = route.params;

  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleChangePassword = async () => {
    const result = await changePassword(
      userId,
      newPassword,
      confirmNewPassword
    );
    if (result) {
      Alert.alert("Change Password", "Successfully!");
      navigation.replace("Auth");
    } else {
      Alert.alert("Change Password", "Failed!");
    }
  };

  const changePassword = async (userId, newPassword, confirmNewPassword) => {
    const response = await axios.post(FORGOT_PASSWORD_CHANGE_URL, {
      id: userId,
      newPassword,
      confirmNewPassword,
    });
    const result = response.data;
    if (response.status === 200) {
      return result;
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Freshloka</Text>
      <Text style={styles.welcomeText}>Change your credential.</Text>

      <TextInput style={styles.input} placeholder="User ID" value={userId} />

      <TextInput
        style={styles.input}
        placeholder="New Password"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm New Password"
        secureTextEntry
        value={confirmNewPassword}
        onChangeText={setConfirmNewPassword}
      />

      <TouchableOpacity
        style={styles.continueButton}
        onPress={handleChangePassword}
      >
        <Text style={styles.buttonText}>Change</Text>
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
  continueButton: {
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
});

export default ForgotPasswordScreen2;
