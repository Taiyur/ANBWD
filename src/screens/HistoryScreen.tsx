import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";

import { getReports } from "../utils/reportStorage";

export default function HistoryScreen() {
  const [reports, setReports] = useState<any[]>([]);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    const data = await getReports();
    setReports(data.reverse()); // latest first
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <Image
        source={{ uri: "file://" + item.image }}
        style={styles.image}
      />

      <Text style={styles.address}>{item.address}</Text>

      <Text style={styles.coords}>
  📍 {item.latitude && item.longitude
    ? `${Number(item.latitude).toFixed(5)}, ${Number(item.longitude).toFixed(5)}`
    : "Location unavailable"}
      </Text>


      <Text style={styles.time}>
        🕒 {new Date(item.time).toLocaleString()}
      </Text>

      <View style={styles.statusBox}>
        <Text style={styles.statusText}>{item.status}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reported Complaints</Text>

      {reports.length === 0 ? (
        <Text style={styles.empty}>No reports submitted yet</Text>
      ) : (
        <FlatList
          data={reports}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    padding: 20,
  },

  title: {
    color: "#22c55e",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },

  empty: {
    color: "#94a3b8",
    textAlign: "center",
    marginTop: 50,
  },

  card: {
    backgroundColor: "#1e293b",
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
  },

  image: {
    width: "100%",
    height: 180,
    borderRadius: 10,
    marginBottom: 10,
  },

  address: {
    color: "white",
    fontWeight: "bold",
  },

  coords: {
    color: "#94a3b8",
    marginTop: 5,
  },

  time: {
    color: "#94a3b8",
    marginTop: 5,
  },

  statusBox: {
    backgroundColor: "#22c55e",
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 10,
    marginTop: 10,
  },

  statusText: {
    color: "white",
    fontWeight: "bold",
  },
});
