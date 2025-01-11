import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Switch } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ProfileScreen = ({ navigation }) => {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [backgroundPlayEnabled, setBackgroundPlayEnabled] =
    React.useState(true);
  const [downloadViaWiFiOnly, setDownloadViaWiFiOnly] = React.useState(false);
  const [autoplayEnabled, setAutoplayEnabled] = React.useState(true);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Profile</Text>
        <TouchableOpacity onPress={() => alert("Logout")}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.profileInfo}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>R</Text>
        </View>
        <Text style={styles.name}>royan</Text>
        <Text style={styles.email}>loka@gamil.com</Text>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.sectionTitle}>Preferences</Text>
      <View style={styles.option}>
        <Text style={styles.optionText}>Notifications</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
        />
      </View>
      <View style={styles.option}>
        <Text style={styles.optionText}>Background Play</Text>
        <Switch
          value={backgroundPlayEnabled}
          onValueChange={setBackgroundPlayEnabled}
        />
      </View>
      <View style={styles.option}>
        <Text style={styles.optionText}>Download via WiFi Only</Text>
        <Switch
          value={downloadViaWiFiOnly}
          onValueChange={setDownloadViaWiFiOnly}
        />
      </View>
      <View style={styles.option}>
        <Text style={styles.optionText}>Autoplay</Text>
        <Switch value={autoplayEnabled} onValueChange={setAutoplayEnabled} />
      </View>

      {/* Footer Navigation */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate("Home")}
        >
          <Ionicons name="home" size={24} color="white" />
          <Text style={styles.navButtonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate("Search")}
        >
          <Ionicons name="search" size={24} color="white" />
          <Text style={styles.navButtonText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate("Cart")}
        >
          <Ionicons name="cart" size={24} color="white" />
          <Text style={styles.navButtonText}>Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate("Profile")}
        >
          <Ionicons name="person" size={24} color="white" />
          <Text style={styles.navButtonText}>Profile</Text>
        </TouchableOpacity>
      </View>
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
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  logoutText: {
    color: "red",
  },
  profileInfo: {
    alignItems: "center",
    marginBottom: 30,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  avatarText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  email: {
    color: "#888",
    marginBottom: 10,
  },
  editButton: {
    backgroundColor: "#2E7D32",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    width: "100%",
  },
  editButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 20,
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  optionText: {
    fontSize: 16,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#2E7D32",
    position: "absolute",
    bottom: 20,
    left: 10,
    right: 10,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 20,
  },
  navButton: {
    alignItems: "center",
  },
  navButtonText: {
    color: "white",
    fontSize: 12,
  },
});

export default ProfileScreen;
