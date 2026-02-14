import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { saveReport } from "../utils/reportStorage";

export default function ResultScreen({ route, navigation }: any) {
  const { image, latitude, longitude, address } = route.params;

  const handleReport = async () => {
    try {
      const userData = await AsyncStorage.getItem("loggedInUser");

      const report = {
        image,
        latitude,
        longitude,
        address,
        user: JSON.parse(userData || "{}"),
        time: new Date().toISOString(),
        status: "Pending",
      };

      await saveReport(report);

      Alert.alert(
        "✅ Report Submitted",
        "Municipality has been notified successfully!"
      );
    } catch (error) {
      Alert.alert("Error", "Failed to submit report");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Detection Result</Text>

      {/* Captured Image */}
      <Image source={{ uri: "file://" + image }} style={styles.image} />

      {/* Location Info */}
      <View style={styles.card}>
        <Text style={styles.label}>📍 Coordinates</Text>
        <Text style={styles.text}>
          {latitude?.toFixed(5)}, {longitude?.toFixed(5)}
        </Text>

        <Text style={styles.label}>🏠 Address</Text>
        <Text style={styles.text}>
          {address ? address : "Fetching address..."}
        </Text>
      </View>

      {/* AI Prediction */}
      <View style={styles.resultBox}>
        <Text style={styles.resultTitle}>AI Prediction</Text>
        <Text style={styles.resultText}>
          ⚠️ Non-Biodegradable Waste Detected
        </Text>
      </View>

      {/* 🚨 REPORT BUTTON */}
      <TouchableOpacity style={styles.reportBtn} onPress={handleReport}>
        <Text style={styles.reportText}>🚨 Report to Municipality</Text>
      </TouchableOpacity>

      {/* Back Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.btnText}>Back to Home</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#0f172a",
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 40,
  },

  title: {
    color: "#22c55e",
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
  },

  image: {
    width: "90%",
    height: 250,
    borderRadius: 15,
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#1e293b",
    padding: 18,
    borderRadius: 12,
    width: "90%",
    marginBottom: 20,
  },

  label: {
    color: "#22c55e",
    fontWeight: "bold",
    marginTop: 10,
    fontSize: 15,
  },

  text: {
    color: "white",
    marginTop: 4,
  },

  resultBox: {
    backgroundColor: "#22c55e",
    padding: 22,
    borderRadius: 15,
    width: "90%",
    alignItems: "center",
    marginBottom: 20,
  },

  resultTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },

  resultText: {
    color: "white",
    marginTop: 8,
    fontSize: 16,
  },

  reportBtn: {
    backgroundColor: "#ef4444",
    padding: 16,
    borderRadius: 12,
    width: "90%",
    alignItems: "center",
    marginBottom: 20,
  },

  reportText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },

  button: {
    backgroundColor: "#22c55e",
    padding: 15,
    borderRadius: 10,
    width: "60%",
    alignItems: "center",
  },

  btnText: {
    color: "white",
    fontWeight: "bold",
  },
});
