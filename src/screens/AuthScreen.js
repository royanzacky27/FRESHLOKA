import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const AuthScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Logika login di sini
    if (email === "loka@gmail.com" && password === "pass123") {
      navigation.replace("Home"); // Arahkan ke halaman Home setelah login
    } else {
      alert("Email atau password salah!");
    }
  };

  const handleForgotPassword = () => {
    // Navigasi ke halaman Forgot Password
    navigation.navigate("ForgotPassword"); // Pastikan Anda memiliki halaman ini
  };

  const handleSignUp = () => {
    // Navigasi ke halaman Sign Up
    navigation.navigate("RegisterScreen1");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Freshloka</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>
      <View style={styles.footer}>
        <Text>Don't have an account? </Text>
        <TouchableOpacity onPress={handleSignUp}>
          <Text style={styles.signUpText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
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
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2E7D32",
    textAlign: "center",
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
  loginButton: {
    backgroundColor: "#2E7D32",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  forgotPassword: {
    textAlign: "right",
    color: "#2E7D32",
    marginBottom: 20,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  signUpText: {
    color: "#2E7D32",
    fontWeight: "bold",
  },
});

export default AuthScreen;
