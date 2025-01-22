import { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Membuat Context untuk Auth
const AssetsContext = createContext();

export const AssetsProvider = ({ children }) => {
  const [assets] = useState({
    sayuran: require("../assets/sayuran.png"),
    buah: require("../assets/buah.png"),
    bumbu: require("../assets/bumbu.png"),
    protein: require("../assets/protein.png"),
    kiwi: require("../assets/kiwi.png"),
    bawangPutih: require("../assets/bawangPutih.png"),
    paketSayurHijau: require("../assets/paketSayurHijau.png"),
    kol: require("../assets/kol.png"),
  });

  return (
    <AssetsContext.Provider value={{ assets }}>
      {children}
    </AssetsContext.Provider>
  );
};

export const useAssets = () => useContext(AssetsContext);
