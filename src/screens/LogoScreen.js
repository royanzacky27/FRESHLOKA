import React, { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";

const LogoScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Auth"); // Ganti dengan halaman Auth setelah 2 detik
    }, 2000); // 2000 ms = 2 detik

    return () => clearTimeout(timer); // Bersihkan timer saat komponen di-unmount
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo.png")} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  logo: {
    width: 200,
    height: 200,
  },
});

export default LogoScreen;
