import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen({ navigation }: any) {

  const handleLogout = async () => {
    await AsyncStorage.removeItem("userLoggedIn");
    await AsyncStorage.removeItem("loggedInUser");
  };

  return (
    <LinearGradient
      colors={["#020617", "#020617", "#071028"]}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <Text style={styles.logo}>CapLoc AI</Text>

        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.hero}>
        <Text style={styles.heroTitle}>
          Automatic Non-Biodegradable{"\n"}
          Waste Material{"\n"}Detection System
        </Text>

        <Text style={styles.heroSubtitle}>
          AI powered detection of non-biodegradable waste with real-time GPS
          reporting.
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate("Capture")}
        style={styles.scanWrapper}
      >
        <LinearGradient
          colors={["#22c55e", "#16a34a"]}
          style={styles.scanButton}
        >
          <Text style={styles.scanIcon}>📸</Text>
        </LinearGradient>
      </TouchableOpacity>

      <Text style={styles.scanText}>Tap to Scan Waste</Text>

      <TouchableOpacity
  style={styles.historyBtn}
  onPress={() => navigation.navigate("History")}
>
  <Text style={styles.historyText}>📋 View Reports</Text>
</TouchableOpacity>

    </LinearGradient>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 40,
  },

  logo: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#22c55e",
    letterSpacing: 1,
  },

  logoutBtn: {
    backgroundColor: "#ff4757",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    elevation: 5,
  },

  logoutText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },

  hero: {
    marginTop: 40,
  },

  heroTitle: {
    fontSize: 34,
    fontWeight: "bold",
    color: "white",
    lineHeight: 42,
  },

  heroSubtitle: {
    color: "#94a3b8",
    marginTop: 15,
    fontSize: 15,
    lineHeight: 22,
  },

  scanWrapper: {
    alignItems: "center",
    marginTop: 70,
  },

  scanButton: {
    width: 130,
    height: 130,
    borderRadius: 65,
    justifyContent: "center",
    alignItems: "center",
    elevation: 15,
  },

  scanIcon: {
    fontSize: 40,
  },

  scanText: {
    color: "#22c55e",
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    fontWeight: "600",
  },
  historyBtn: {
  backgroundColor: "#1e293b",
  padding: 14,
  borderRadius: 12,
  marginTop: 40,
  width: "70%",
  alignSelf: "center",
  alignItems: "center",
  borderWidth: 1,
  borderColor: "#22c55e",
},

historyText: {
  color: "#22c55e",
  fontWeight: "bold",
},
});
