import AsyncStorage from "@react-native-async-storage/async-storage";

// Fungsi untuk mengambil token
const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem("authToken");
    if (token !== null) {
      console.log("Token found:", token);
      // Lakukan sesuatu dengan token, misalnya kirim ke API untuk autentikasi
    } else {
      console.log("No token found.");
    }
  } catch (error) {
    console.error("Error getting token:", error);
  }
};

const handleLogout = async () => {
  try {
    await AsyncStorage.removeItem("authToken");
    console.log("Token removed.");
    // Arahkan pengguna ke halaman login setelah logout
    navigation.replace("Login");
  } catch (error) {
    console.error("Error removing token:", error);
  }
};
