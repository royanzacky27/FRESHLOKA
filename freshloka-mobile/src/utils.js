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

const assets = {
  sayuran: require("../assets/sayuran.png"),
  buah: require("../assets/buah.png"),
  bumbu: require("../assets/bumbu.png"),
  protein: require("../assets/protein.png"),
  kiwi: require("../assets/kiwi.png"),
  bawangPutih: require("../assets/bawangPutih.png"),
  paketSayurHijau: require("../assets/paketSayurHijau.png"),
  kol: require("../assets/kol.png"),
};
